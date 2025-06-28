import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { BookOpen, Mail, Lock, Eye, EyeOff, Phone, Smartphone, ArrowLeft, AlertCircle } from "lucide-react";
import OTPInput from "../components/OTPInput";
import PhoneInput from "../components/PhoneInput";

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email', 'phone', 'email-otp'
  const [step, setStep] = useState('credentials'); // 'credentials', 'otp', 'email-verification', 'email-otp-sent'
  
  // Email login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  
  // Phone login states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  // Common states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const navigate = useNavigate();

  const setupRecaptcha = () => {
    return new Promise((resolve, reject) => {
      try {
        // Clear any existing recaptcha
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }
        
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: (response) => {
            console.log('reCAPTCHA solved');
            resolve(response);
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
            reject(new Error('reCAPTCHA expired'));
          }
        });
        
        window.recaptchaVerifier.render().then((widgetId) => {
          console.log('reCAPTCHA rendered with widget ID:', widgetId);
          resolve(widgetId);
        });
      } catch (error) {
        console.error('Error setting up reCAPTCHA:', error);
        reject(error);
      }
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (!user.emailVerified) {
        setStep('email-verification');
        setLoading(false);
        return;
      }
      
      navigate("/dashboard");
    } catch (err) {
      console.error('Email login error:', err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailOtpLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const actionCodeSettings = {
        url: window.location.origin + '/login',
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem('emailForSignIn', email);
      setEmailOtpSent(true);
      setStep('email-otp-sent');
    } catch (err) {
      console.error('Email OTP error:', err);
      if (err.code === "auth/unauthorized-continue-uri") {
        setError("Email OTP is not properly configured. Please contact support or try a different login method.");
      } else {
        setError("Failed to send email OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (err) {
      console.error('Phone login error:', err);
      if (err.code === "auth/billing-not-enabled") {
        setError("Phone authentication is not available. Please use email login instead.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please try again later.");
      } else if (err.code === "auth/invalid-phone-number") {
        setError("Invalid phone number format. Please check and try again.");
      } else {
        setError("Failed to send OTP. Please check your phone number and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (otp) => {
    setOtpLoading(true);
    setError("");

    try {
      await confirmationResult.confirm(otp);
      navigate("/dashboard");
    } catch (err) {
      console.error('OTP verification error:', err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSendEmailVerification = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailVerificationSent(true);
    } catch (err) {
      console.error('Email verification error:', err);
      setError("Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      console.error('Google login error:', err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check for email link sign-in on component mount
  React.useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          localStorage.removeItem('emailForSignIn');
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error('Email link sign-in error:', error);
          setError("Failed to sign in with email link.");
        });
    }
  }, [navigate]);

  const renderEmailOtpSent = () => (
    <div className="text-center space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Check Your Email</h3>
        <p className="text-blue-700 text-sm">
          We've sent a sign-in link to <strong>{email}</strong>. 
          Click the link in your email to sign in.
        </p>
      </div>

      <button
        onClick={() => {
          setStep('credentials');
          setEmailOtpSent(false);
        }}
        className="flex items-center justify-center w-full text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </button>
    </div>
  );

  const renderEmailVerification = () => (
    <div className="text-center space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <Mail className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Email Verification Required</h3>
        <p className="text-yellow-700 text-sm">
          Please verify your email address to continue. Check your inbox for a verification link.
        </p>
      </div>

      {!emailVerificationSent ? (
        <button
          onClick={handleSendEmailVerification}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Verification Email"}
        </button>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700 text-sm">
            Verification email sent! Please check your inbox and click the verification link.
          </p>
        </div>
      )}

      <button
        onClick={() => {
          setStep('credentials');
          setEmailVerificationSent(false);
        }}
        className="flex items-center justify-center w-full text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </button>
    </div>
  );

  const renderOTPStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Verification Code</h3>
        <p className="text-gray-600">
          We've sent a 6-digit code to {phoneNumber}
        </p>
      </div>

      <div className="space-y-4">
        <OTPInput 
          length={6} 
          onComplete={handleOTPVerification}
          disabled={otpLoading}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {otpLoading && (
          <div className="text-center">
            <p className="text-blue-600 text-sm">Verifying OTP...</p>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setStep('credentials');
          setConfirmationResult(null);
          setError("");
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
          }
        }}
        className="flex items-center justify-center w-full text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Phone Number
      </button>
    </div>
  );

  const renderCredentialsStep = () => (
    <div className="space-y-6">
      {/* Login Method Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setLoginMethod('email')}
          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            loginMethod === 'email'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Mail className="w-4 h-4 mr-1" />
          Email
        </button>
        <button
          onClick={() => setLoginMethod('email-otp')}
          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            loginMethod === 'email-otp'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Mail className="w-4 h-4 mr-1" />
          Email OTP
        </button>
        <button
          onClick={() => setLoginMethod('phone')}
          className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            loginMethod === 'phone'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Phone className="w-4 h-4 mr-1" />
          Phone
        </button>
      </div>

      {/* Configuration Notice */}
      {(loginMethod === 'email-otp' || loginMethod === 'phone') && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-amber-800 mb-1">
                {loginMethod === 'phone' ? 'Phone Authentication Notice' : 'Email OTP Notice'}
              </h4>
              <p className="text-sm text-amber-700">
                {loginMethod === 'phone' 
                  ? 'Phone authentication requires Firebase billing to be enabled. If you encounter issues, please use email login instead.'
                  : 'Email OTP requires proper domain configuration. If you encounter issues, please use regular email login instead.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Email Login Form */}
      {loginMethod === 'email' && (
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In with Email"}
          </button>
        </form>
      )}

      {/* Email OTP Login Form */}
      {loginMethod === 'email-otp' && (
        <form onSubmit={handleEmailOtpLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Email OTP"}
          </button>
        </form>
      )}

      {/* Phone Login Form */}
      {loginMethod === 'phone' && (
        <form onSubmit={handlePhoneLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              disabled={loading}
              placeholder="Enter your phone number"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !phoneNumber}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Google Login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your personal library</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {step === 'credentials' && renderCredentialsStep()}
          {step === 'otp' && renderOTPStep()}
          {step === 'email-verification' && renderEmailVerification()}
          {step === 'email-otp-sent' && renderEmailOtpSent()}

          {/* Sign Up Link */}
          {step === 'credentials' && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Recaptcha Container */}
        <div id="recaptcha-container" className="mt-4"></div>
      </div>
    </div>
  );
};

export default Login;