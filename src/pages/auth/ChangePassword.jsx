import React, { useState } from 'react';
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
