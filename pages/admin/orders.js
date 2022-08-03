import { useState, useEffect } from "react";
import CountUp from "react-countup";
import AIcon from "@mui/icons-material/Apple";
import BIcon from "@mui/icons-material/Book";
import DIcon from "@mui/icons-material/Dashboard";
import { io } from "socket.io-client";
import { parse } from "cookie";
import { useRouter } from "next/router";
import Head from "next/head";

let socket;

const OrderStatus = (props) => {
  const [status, setStatus] = useState(props.status);
  const socketInit = async () => {
    await fetch("/api/init_ws_connection");
    socket = io();
  };
  const router = useRouter();
  useEffect(() => {
    if (!socket) socketInit();
  }, []);
  const dispatchOrder = async (e) => {
    const status = e.target.value;
    setStatus(status);
    await fetch(`/api/admin/setStatus?status=${status}`, {
      method: "POST",
      body: JSON.stringify({ order_id: props.order_id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.redirected) return router.push(res.url);
      socket.emit("setStatus", { order_id: props.order_id, status });
    });
  };
  return (
    <select
      className="change_status"
      onChange={dispatchOrder}
      name="change status"
      onChange={dispatchOrder}
      disabled={status === "completed" ? true : false}
      value={status}
    >
      <option value="in progress">Pending</option>
      <option value="on its way">Dispatched</option>
      <option value="completed">Completed</option>
    </select>
  );
};

export default function Orders(props) {
  const { orders } = props;
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [incompleteOrdersCount, setIncompleteOrdersCount] = useState(0);
  useEffect(() => {
    const totalBooks = orders.reduce((total, order) => {
      return (
        total +
        order.quantity_each.split(",").reduce((sum, val) => sum + +val, 0)
      );
    }, 0);
    setTotalQuantity(totalBooks);
    const incompleteOrders = orders.filter(
      (order) => order.status !== "completed"
    );
    setIncompleteOrdersCount(incompleteOrders.length);
  }, []);
  return (
    <>
      <Head>
        <title>Admin panel</title>
      </Head>
      <div className="admin_container">
        <div className="admin_panel_title">
          <div>One More Chapter - admin</div>
        </div>
        <div className="admin_dashboard">
          <div className="tab" style={{ background: "#3c3ce1" }}>
            <div className="tab_info">
              <span className="tab_title">All orders</span>
              <span className="tab_value">
                <CountUp end={orders.length} duration={3} delay={0} />
              </span>
            </div>
            <div>
              <AIcon className="tab_icon" />
            </div>
          </div>
          <div className="tab" style={{ background: "rgb(41 211 61)" }}>
            <div className="tab_info">
              <span className="tab_title">Books sold</span>
              <span className="tab_value">
                <CountUp end={totalQuantity} duration={3} delay={0} />
              </span>
            </div>
            <div>
              <BIcon className="tab_icon" />
            </div>
          </div>
          <div className="tab" style={{ background: "rgb(197 183 34)" }}>
            <div className="tab_info">
              <span className="tab_title">Orders in progress</span>
              <span className="tab_value">
                <CountUp end={incompleteOrdersCount} duration={3} delay={0} />
              </span>
            </div>
            <div>
              <DIcon className="tab_icon" />
            </div>
          </div>
        </div>
        <table className="admin_table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Delivery address</th>
              <th>Time</th>
              <th>Order items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.orders.map((order) => (
              <tr key={`order_${order.order_id}`}>
                <td style={{ fontSize: 13 }}>{order.order_id}</td>
                <td>{order.name}</td>
                <td>{order.contact}</td>
                <td>{order.delivery_address}</td>
                <td>{order.time}</td>
                <td>
                  {order.titles.split(",").map((book_title, index) => (
                    <div key={`book_${index}`} className="order_book_list">
                      <span>{book_title}</span>
                      <span>Qty: {order.quantity_each[index]}</span>
                    </div>
                  ))}
                </td>
                <td>{order.total}</td>
                <td>
                  <OrderStatus
                    order_id={order.order_id}
                    status={order.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { isTokenValid } = await import("../api/admin/auth");
  const { token } = parse(context.req.headers.cookie || "");
  if (isTokenValid(token)) {
    const { get_customer_orders } = await import("../../db/db");
    const orders = await get_customer_orders();
    const props = { orders };
    return {
      props,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: `/admin/login`,
    },
  };
}
