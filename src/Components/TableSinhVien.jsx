import React, { Component } from 'react'

export default class TableSinhVien extends Component {

  render() {
    const {arrSinhVien, handleDelSinhVien, handleEditSinhVien} = this.props
    return (
      <table className='table'>
        <thead className='bg-dark text-white'>
          <tr>
            <th>Mã SV</th>
            <th>Số điện thoại</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrSinhVien.map(({masv, sodt, hoten, email}, index)=>{
            return <tr key={index}>
              <td>{masv}</td>
              <td>{sodt}</td>
              <td>{hoten}</td>
              <td>{email}</td>
              <td>
                <button className='btn btn-danger'>
                  <i className='fa fa-trash' onClick={()=>{this.props.handleDelSinhVien(masv)}}></i>
                </button>&nbsp;
                <button 
                  onClick={()=>{
                    let svEdit = {masv, sodt, hoten, email}
                    handleEditSinhVien(svEdit)
                  }}
                  className='btn btn-primary'>
                  <i className='fa fa-edit'></i>
                </button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}
