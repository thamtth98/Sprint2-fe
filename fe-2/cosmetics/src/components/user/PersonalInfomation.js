import { useEffect, useState } from "react";
import * as paymentService from "../../service/paymentService";
import * as userService from "../../service/userService";
import { toast } from "react-toastify";


function PersonalInfomation() {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    loadUserLogin();
  }, []);
  const loadUserLogin = async () => {
    try {
      const res = await paymentService.getInfo();
      setUserInfo(res);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(e.target.value);
  };

 const handleSubmit = async ()=>{
    console.log(userInfo);
    try{
        const res = await userService.saveInfo(userInfo);
        if(res.status === 200){
            toast.success("Thay đổi thông tin thành công!!", {
              className: "custom-toast-success",
            });
          }
    }catch(e){
        console.log(e);
    }
    
 }
  return (
    <>
      <div className=" p-5 shadow-0 col-12 row">
        {userInfo && (
          <div className="col-8 row border mb-5">
            <div className="col-12">
              <h3>Thông tin cá nhân</h3>
            </div>
            <div className="col-12 row">
              <div className="col-6 mt-2">
                <div className="form-control" style={{ border: "none" }}>
                  <small>Họ và tên</small>
                  <input
                    name="fullname"
                    // value={userData.fullname}
                    type="text"
                    style={{ fontWeight: "bold" }}
                    placeholder="Nguyen Van A"
                    className="form-control"
                    value={userInfo.fullname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-control" style={{ border: "none" }}>
                  <small>Số điện thoại</small>
                  <input
                    name="phoneNumber"
                    // value={userData.phoneNumber}
                    type="text"
                    style={{ fontWeight: "bold" }}
                    placeholder="09xxxxxxxx"
                    className="form-control"
                    value={userInfo.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-control" style={{ border: "none" }}>
                  <small>Địa chỉ nhận hàng</small>
                  <input
                    type="text"
                    style={{
                      fontWeight: "bold",
                      overflow: "hidden",
                      resize: "none",
                    }}
                    placeholder="Số nhà, địa chỉ"
                    className="form-control"
                    value={userInfo.address}
                    name="address"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-6 mt-2">
                <div className="form-control" style={{ border: "none" }}>
                  <small>Email</small>
                  <input
                    type="email"
                    style={{ fontWeight: "bold" }}
                    placeholder="abc@gmail.com"
                    className="form-control"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button className="btn btn-success col-2 ms-4 mt-3" onClick={handleSubmit}>
                Thay đổi
              </button>

              <hr className="mt-3" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default PersonalInfomation;
