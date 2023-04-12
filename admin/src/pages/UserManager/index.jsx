import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BLANK_AVT, IMG_URL, valueSortUser } from '../../constants'
import { getData } from '../../libs/fetchData'
import { getAlert, getLoading } from '../../stores/notifyReducer'
import moment from 'moment'
import './users.scss'
import AlertDel from '../../components/notifications/alert'
import { AiOutlineDelete } from 'react-icons/ai'
import SortData from '../../components/QueryData/Sort'
import FilterData from '../../components/QueryData/Filter'
import { getManyDelete } from '../../stores/deleteDataReducer'
import { setBackground } from '../../stores/themeWebReducer'
import Pagination from '../../components/QueryData/Pagination'
function Users() {
    const { refreshUser } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [sort_by, set_sort_by] = useState("");
    const [filter_by, set_filter_by] = useState("");
    const [page_num, set_page_num] = useState(1);
    const [page_size, set_page_size] = useState(5);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const getUser = async () => {
            try {
                dispatch(getLoading(true))
                const res = await getData(`users/get-all?page=${page_num}&page_size=${page_size}&sort_by=${sort_by}&filter_by=${filter_by}`);
                setUsers(res.data.users);
                setCount(res.data.count)
                dispatch(getLoading(false))

            } catch (error) {
                console.log(error);
                setUsers(null)
                dispatch(getLoading(false))

            }
        };
        getUser();
    }, [refreshUser, sort_by, filter_by, page_num, page_size]);
    //select all
    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(users.map((list) => list._id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };
    const handleChange = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };
    return (
        <div className='users'>
            <div className="top">
                <div className="title">
                    <span>Danh sách tài khoản:</span>
                    <Link to='new' >Thêm mới</Link>
                </div>
                <div className={"select"}>
                    <span
                        className={"selectDel " + (isCheck.length > 0 ? "active" : "")}
                        onClick={() => {
                            dispatch(setBackground({ active: true, type: "manyDel" }));
                            dispatch(
                                getManyDelete({
                                    active: true,
                                    accept: "Xóa",
                                    cancel: "Hủy",
                                    value: {
                                        isCheck: isCheck,
                                        header: "Xóa nhiều user.",
                                        body: "Bạn đang xóa nhiều dữ liệu trong một lần! Bạn chắc chắn muốn xóa không?",
                                    },
                                })
                            );
                        }}
                    >
                        <AiOutlineDelete /> Delete Data
                    </span>
                    <SortData valueSort={valueSortUser} set_sort_by={set_sort_by} />
                    <FilterData
                        valueFilter={['admin', 'user']}
                        typeFilter={{ name: 'Quyền', value: "role" }}
                        set_filter_by={set_filter_by}
                    />
                </div>
            </div>
            <div className="body">
                <div className="tableData">
                    <table cellSpacing={10} cellPadding={10}>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" onChange={handleSelectAll} />
                                </th>
                                <th>UserId</th>
                                <th>Username</th>
                                <th>Birth Day</th>
                                <th>Email</th>
                                <th>Full name</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? (
                                users.map((user, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    id={user._id}
                                                    onChange={handleChange}
                                                    checked={isCheck.includes(user._id)}
                                                />
                                            </td>
                                            <td>{user._id}</td>
                                            <td>
                                                <span className='cellWithImg'><img
                                                    alt="avatar"
                                                    src={
                                                        user.avatar
                                                            ? `${IMG_URL}/${user.avatar}`
                                                            : BLANK_AVT
                                                    }
                                                    className="cellImg"
                                                /> {user.username} </span>
                                            </td>
                                            <td>{moment(user.birthday).format("L") || null}</td>
                                            <td>{user.email}</td>
                                            <td>{user.fullName}</td>
                                            <td className='cellWithRole'><span className={`${user.role}`}>{user.role}</span></td>
                                            <td className="action">
                                                <AlertDel idItem={user._id} />
                                                <span
                                                    className="editBtn"
                                                    onClick={() => {
                                                        navigate(user._id);
                                                    }}
                                                >
                                                    Chi Tiết
                                                </span>
                                                {"  "}
                                                <span
                                                    className="deleteBtn"
                                                    onClick={() => {
                                                        dispatch(
                                                            getAlert({
                                                                open: true,
                                                                delete: { id: user._id, type: "users" },

                                                            })
                                                        );
                                                    }}
                                                >
                                                    Xóa
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: 'center' }}>User not found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    count={count}
                    pageSize={set_page_size}
                    pageNum={set_page_num}
                    lengthItem={users?.length}
                    values={[5, 10, 15]}
                />
            </div>
        </div>
    )
}

export default Users