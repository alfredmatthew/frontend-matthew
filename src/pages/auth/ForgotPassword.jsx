// ForgotPassword.js

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
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { sendRecoveryEmail } from '../../api/apiForgotPassword';
import { toast } from "react-toastify";

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSendRecoveryEmail = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      setIsEmailValid(false);
      return;
    }

    try {
      const response = await sendRecoveryEmail({ email });
      toast.success(response.message);
      setRecoverySent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(true);
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
            Password
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="body" className="mb-2">
            Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
          </Typography>
          <Input
            label="Email"
            size="lg"
            value={email}
            onChange={handleChangeEmail}
            disabled={recoverySent}
          />
          {!isEmailValid && (
            <Typography variant="error" className="mt-1 text-red-500">
              Please enter a valid email address.
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          {!recoverySent ? (
            <Button variant="gradient" fullWidth onClick={handleSendRecoveryEmail}>
              Send Recovery Email
            </Button>
          ) : (
            <Typography variant="small" className="flex justify-center" color="blue">
              Recovery email sent to {email}. Check your inbox.
            </Typography>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
