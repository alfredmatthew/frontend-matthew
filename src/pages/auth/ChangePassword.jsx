// import React, { useState } from "react";
// import { changePassword } from "../../api/user";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import ReactLoading from "react-loading";
// import { Card, CardHeader, CardBody, Typography, Input, Button } from "@material-tailwind/react";

// const ChangePassword = () => {
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [newPassword2, setNewPassword2] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
        
    
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         if (oldPassword == "" || newPassword == "" || newPassword2 == "") {
//             Swal.fire({
//             title: "Failed",
//             text: "All fields are required",
//             icon: "error",
//             });
//             setLoading(false);
//             return;
//         }

//         if (newPassword !== newPassword2) {
//             Swal.fire({
//             title: "Failed",
//             text: "New password does not match",
//             icon: "error",
//             });
//             setLoading(false);
//             return;
//         }
    
//         changePassword({ oldPassword, newPassword })
//         .then((res) => {
//             Swal.fire({
//             title: "Success",
//             text: res.message,
//             icon: "success",
//             });
//             navigate("/dashboard");
//         })
//         .catch((err) => {
//             console.log(err);
//             Swal.fire({
//             title: "Failed",
//             text: err.message,
//             icon: "error",
//             });
//             setLoading(false);
//         });
//     };
    
//     return (
//         <Card className="h-full w-full">
//             <CardHeader floated={false} shadow={false} className="rounded-none">
//                 <div className="mb-0 flex items-center justify-between gap-8">
//                     <div>
//                     <Typography variant="h5" color="blue-gray">
//                         Change Password
//                     </Typography>
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardBody>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4 flex w-full flex-col">
//                         <Input 
//                             label="Old Password"
//                             type="password"
//                             className=""
//                             value={oldPassword}
//                             onChange={(e) => setOldPassword(e.target.value)}
//                             color="orange"
//                             variant="outlined"
//                             size="lg"
//                         />
//                     </div>
//                     <div className="mb-4 flex w-full flex-col">
//                         <Input 
//                             label="New Password"
//                             type="password"
//                             className=""
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             color="orange"
//                             variant="outlined"
//                             size="lg"
//                         />
//                     </div>
//                     <div className="mb-4 flex w-full flex-col">
//                         <Input
//                             label="Confirm New Password"
//                             type="password"
//                             className=""
//                             value={newPassword2}
//                             onChange={(e) => setNewPassword2(e.target.value)}
//                             color="orange"
//                             variant="outlined"
//                             size="lg"
//                         />
//                     </div>
//                     <Button
//                         variant="filled"
//                         color="orange"
//                         size="md"
//                         type="submit"
//                     >
//                         {loading ? (
//                         <ReactLoading type="spin" color="#ffffff" height={30} width={30} />
//                         ) : (
//                         "Change Password"
//                         )}
//                     </Button>
//                 </form>
//             </CardBody>
//         </Card>
        
//     );
// }

// export default ChangePassword;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  
  // Use useParams to get the token from the URL
  const { token } = useParams();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setIsPasswordValid(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError('Passwords must contain at least eight characters, including at least 1 letter and 1 number.');
      setIsPasswordValid(false);
      return;
    }

    console.log('Password reset successfully');
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
    setPasswordError('');
    setIsPasswordValid(true);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
    setIsPasswordValid(true);
  };


  return (
    <div className="flex justify-center items-center mt-12">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Reset Password
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {/* Display the token in the Typography component */}
          <Typography variant="body" className="text-sm text-gray-500">
            Your token: {token}
          </Typography>
          <Input
            label="New Password"
            size="lg"
            type="password"
            value={newPassword}
            onChange={handleChangeNewPassword}
            className={` ${!isPasswordValid ? 'border-red-500' : ''}`}
          />
          <Input
            label="New Password (again)"
            size="lg"
            type="password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            className={` ${!isPasswordValid ? 'border-red-500' : ''}`}
          />
          <Typography variant="body" className="text-sm text-gray-500">
            Passwords must contain at least eight characters, including at least 1 letter and 1 number.
          </Typography>
          {passwordError && (
            <Typography variant="error" className="mt-1 text-red-500">
              {passwordError}
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleResetPassword}>
            Recover Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}