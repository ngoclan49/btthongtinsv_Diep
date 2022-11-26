import React, { Component } from "react";
import TableSinhVien from "./TableSinhVien";

export default class ReactForm extends Component {
  state = {
    formValue: {
      masv: "",
      sodt: "",
      hoten: "",
      email: "",
    },

    formError: {
      masv: "",
      sodt: "",
      hoten: "",
      email: "",
    },

    valid: false,

    arrSinhVien: [
      {
        masv: "1",
        sodt: "0912345678",
        hoten: "Nguyễn Văn A",
        email: "nguyenvana@gmail.com",
      },
      {
        masv: "2",
        sodt: "0913222222",
        hoten: "Nguyễn Văn B",
        email: "nguyenvanb@gmail.com",
      },
    ]
  };

  handleUpdateSinhVien = () => {
    let {arrSinhVien, formValue} = this.state
    let svUpdate = arrSinhVien.find(sv => sv.masv === formValue.masv)
    if (svUpdate) {
      // svUpdate.sodt = formValue.sodt
      // svUpdate.hoten = formValue.hoten
      // svUpdate.email = formValue.email
      for (let key in svUpdate) {
        if (key !== 'masv') {
          svUpdate[key] = formValue[key]
        }
      }
    }
    //Cập nhật lại state sau khi chỉnh sửa
    this.setState ({
      arrSinhVien: arrSinhVien
    })
  }

  handleEditSinhVien = (svClick) =>{
    this.setState({
      formValue: svClick
    },()=>{
      this.setState({
        valid: this.checkFormValid()
      })
    })
  }

  checkFormValid = () => {
    let { formError, formValue } = this.state;
    for (let key in formError) {
      if (formError[key] !== "" || formValue[key] === "") {
        return false;
      }
    }
    return true;
  };

  handleChangeInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    let newFormValue = this.state.formValue;
    newFormValue[name] = value;

    let dataMaxLength = e.target.getAttribute("data-max-length");
    let dataType = e.target.getAttribute("data-type");

    //Xử lý lỗi cho formError
    let newFormError = this.state.formError;
    let message = "";
    if (value.trim() === "") {
      message = name + " không được để trống!";
    } else {
      if (dataType === "email") {
        let regexEmail =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regexEmail.test(value)) {
          message = "email không hợp lệ!";
        }
      }
      if (dataMaxLength !== null && value.length > dataMaxLength) {
        message = name + " không được quá 10 ký tự!";
      }
    }

    newFormError[name] = message;

    this.setState(
      {
        formValue: newFormValue,
        formError: newFormError,
      },
      () => {
        this.setState({
          valid: this.checkFormValid(),
        });
        // console.log(this.state.formValue);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.checkFormValid()) {
      alert("Form không hợp lệ");
      return;
    }

    //Thêm sinh viên vào mảng => cập nhật state
    let arrSinhVien = this.state.arrSinhVien;
    let newSinhVien = { ...this.state.formValue };
    arrSinhVien.push(newSinhVien);
    this.setState({
      arrSinhVien: arrSinhVien,
    });
  };

  handleDelSinhVien = (masvClick) => {
    let arrSinhVien = this.state.arrSinhVien.filter(sv => sv.masv !== masvClick);

    //cập nhật state
    this.setState({
      arrSinhVien: arrSinhVien,
    });
  };

  render() {
    let {formValue} = this.state
    
    return (
      <>
        <form className="container mt-5" onSubmit={this.handleSubmit}>
          <h5 className="bg-dark text-white p-3">Thông tin Sinh Viên</h5>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <p>Mã SV</p>
                    <input
                      value={formValue.masv}
                      data-max-length="10"
                      className="form-control"
                      type="text"
                      name="masv"
                      onInput={this.handleChangeInput}
                    />

                    {this.state.formError.masv && (
                      <div className="alert alert-danger mt-2 p-2">
                        {this.state.formError.masv}
                      </div>
                    )}
                    <br />
                  </div>
                  <div className="form-group">
                    <p>Số điện thoại</p>
                    <input
                      value={formValue.sodt}
                      data-max-length="10"
                      className="form-control"
                      type="number"
                      name="sodt"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.sodt && (
                      <div className="alert alert-danger mt-2 p-2">
                        {this.state.formError.sodt}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <p>Họ tên</p>
                    <input
                      value={formValue.hoten}
                      className="form-control"
                      type="text"
                      name="hoten"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.hoten && (
                      <div className="alert alert-danger mt-2 p-2">
                        {this.state.formError.hoten}
                      </div>
                    )}
                    <br />
                  </div>
                  <div className="form-group">
                    <p>Email</p>
                    <input
                      value={formValue.email}
                      data-type="email"
                      className="form-control"
                      type="text"
                      name="email"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.email && (
                      <div className="alert alert-danger mt-2 p-2">
                        {this.state.formError.email}
                      </div>
                    )}
                  </div>
                  <br />
                </div>

                <div className="card-footer bg-white d-flex">
                  <button
                    type="submit"
                    className="btn btn-success mt-2"
                    disabled={!this.state.valid}
                  >
                    Thêm sinh viên
                  </button>&nbsp;

                  <button
                    onClick={()=>this.handleUpdateSinhVien()}
                    type="button"
                    className="btn btn-primary mt-2"
                    disabled={!this.state.valid}
                  >
                    Cập nhật
                  </button>&nbsp;
                  <div className="search">
                    <input 
                      type="text" 
                      className="form-control" placeholder="Tìm kiếm ..." 
                    />
                    <button className="btn btn-warning btn-search">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="container mt-3">
          <TableSinhVien 
          handleEditSinhVien = {this.handleEditSinhVien}
          arrSinhVien={this.state.arrSinhVien} 
          handleDelSinhVien = {this.handleDelSinhVien}
          />
        </div>
      </>
    );
  }
}
