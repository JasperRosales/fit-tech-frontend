
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
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();

  // Destructure the necessary values from the hook
  const { login, isLoading, error: authError, userRole } = useAuth();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Local state for immediate form-level errors
  const [localError, setLocalError] = useState(null); 



  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLocalError(null); // Clear previous errors

    try {
      // 1. Execute the login function from the hook
      await login(email, password); 
      // Navigation will be handled by useEffect below when userRole updates
    } catch (err) {
      // 2. Update local error state if the login API call fails
      setLocalError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  // Handle navigation after successful login based on user role
  useEffect(() => {
    if (userRole) {
      switch (userRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'staff':
          navigate('/staff');
          break;
        default:
          navigate('/user');
          break;
      }
    }
  }, [userRole, navigate]);

  const handleForgotPassword = () => {
    navigate('/otp');
  };

  // Determine the final error message to display
  const displayError = localError || authError; 

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
            <CardTitle className="text-xl">Welcome back</CardTitle>

            <CardDescription>
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>

              <FieldGroup>
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
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
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <button 
                        type="button" 
                        className="ml-auto text-sm underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer"
                        onClick={handleForgotPassword}
                        disabled={isLoading}
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      disabled={isLoading}
                    />
                  </Field>
                </motion.div>
                
                {displayError && (
                    <div className="text-sm text-red-500 text-center mt-2">
                        {displayError}
                    </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <Field>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Logging In...' : 'Login'}
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <button 
                        type="button"
                        className="underline underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer"
                        onClick={() => navigate('/signup')}
                        disabled={isLoading}
                      >
                        Sign up
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
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <button 
            type="button"
            className="underline underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer"
            onClick={() => {
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