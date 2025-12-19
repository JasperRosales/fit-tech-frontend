

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useModal } from "@/lib/modal-context"



export function SignupForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const { register, isLoading, error: authError } = useAuth();
  const { showSuccess, showError } = useModal();


  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    if (password !== confirmPassword) {
      showError(
        'Password Mismatch',
        'The passwords you entered do not match. Please make sure both passwords are identical.'
      );
      return;
    }

    if (password.length < 8) {
      showError(
        'Weak Password',
        'Your password must be at least 8 characters long. Please choose a stronger password.'
      );
      return;
    }

    try {
      await register(email, password, 'user'); // Default role is 'user' for regular users
      
      showSuccess(
        'Registration Successful!',
        'Your account has been created successfully. You can now log in with your credentials.',
        {
          duration: 3000, // Auto-close after 3 seconds
          onConfirm: () => {
            navigate('/login');
          }
        }
      );
    } catch (err) {
      // Handle registration errors with modal
      showError(
        'Registration Failed',
        err.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <motion.div 
      className={cn("flex flex-col gap-6", className)} 
      {...props}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>  

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="m@example.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </Field>
                </motion.div>
                

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <Field>
                    <Field className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input 
                          id="password" 
                          type="password" 
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="confirm-password">
                          Confirm Password
                        </FieldLabel>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          required 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={isLoading}
                        />
                      </Field>
                    </Field>
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                  </Field>
                </motion.div>
                





                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Field>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                    <FieldDescription className="text-center">
                      Already have an account?{" "}
                      <button 
                        type="button"
                        className="underline underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer"
                        onClick={() => navigate('/login')}
                        disabled={isLoading}
                      >
                        Sign in
                      </button>
                    </FieldDescription>
                  </Field>
                </motion.div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <button 
            type="button"
            className="underline underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer"
            onClick={() => {
              // TODO: Implement terms of service
              console.log('Terms of Service clicked');
            }}
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button 
            type="button"
            className="underline underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer"
            onClick={() => {
              // TODO: Implement privacy policy
              console.log('Privacy Policy clicked');
            }}
          >
            Privacy Policy
          </button>
          .
        </FieldDescription>
      </motion.div>
    </motion.div>
  );
}
