export default function Orders(props) {
  return (
    <>
      <div className="admin_container">
        <div className="admin_dashboard">
          <div className="tab" style={{ background: "#3c3ce1" }}>
            <span className="tab_title">All orders</span>
            <span className="tab_value">30</span>
          </div>
          <div className="tab" style={{ background: "rgb(41 211 61)" }}>
            <span className="tab_title">Books sold</span>
            <span className="tab_value">120</span>
          </div>
          <div className="tab" style={{ background: "orange" }}>
            <span className="tab_title">New customers</span>
            <span className="tab_value">13</span>
          </div>
          <div className="tab" style={{ background: "rgb(197 183 34)" }}>
            <span className="tab_title">Orders in progress</span>
            <span className="tab_value">5</span>
          </div>
        </div>
        <table id="customer_order_table" class="admin_table nowrap">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Age</th>
              <th>Start date</th>
              <th>Salary</th>
              <th>Extn.</th>
              <th>E-mail</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tiger</td>
              <td>Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
              <td>2011/04/25</td>
              <td>$320,800</td>
              <td>5421</td>
              <td>t.nixon@datatables.net</td>
            </tr>

            <tr>
              <td>Garrett</td>
              <td>Winters</td>
              <td>Accountant</td>
              <td>Tokyo</td>
              <td>63</td>
              <td>2011/07/25</td>
              <td>$170,750</td>
              <td>8422</td>
              <td>g.winters@datatables.net</td>
            </tr>

            <tr>
              <td>Ashton</td>
              <td>Cox</td>
              <td>Junior Technical Author</td>
              <td>San Francisco</td>
              <td>66</td>
              <td>2009/01/12</td>
              <td>$86,000</td>
              <td>1562</td>
              <td>a.cox@datatables.net</td>
            </tr>

            <tr>
              <td>Cedric</td>
              <td>Kelly</td>
              <td>Senior Javascript Developer</td>
              <td>Edinburgh</td>
              <td>22</td>
              <td>2012/03/29</td>
              <td>$433,060</td>
              <td>6224</td>
              <td>c.kelly@datatables.net</td>
            </tr>

            <tr>
              <td>Airi</td>
              <td>Satou</td>
              <td>Accountant</td>
              <td>Tokyo</td>
              <td>33</td>
              <td>2008/11/28</td>
              <td>$162,700</td>
              <td>5407</td>
              <td>a.satou@datatables.net</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
