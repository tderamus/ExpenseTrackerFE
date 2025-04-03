import Table from 'react-bootstrap/Table';

function ExpensesCard() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>PAID</th>
          <th>BILL</th>
          <th>DUE DATE</th>
          <th>AMOUNT DUE</th>
          <th>AMOUNT PAID</th>
          <th>BALANCE DUE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ExpensesCard;
