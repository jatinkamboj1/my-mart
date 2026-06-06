"use client";
import { SignInForm } from "@/components/auth/Login";

export default function SignIn() {
    return (
        <div className="login-register-wrapper section-padding">
            <div className="container">
                <div className="member-area-from-wrap">
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block">
                            <img style={{aspectRatio:'1.2/1', objectFit: "cover"}} src="/assets/images/signin.jpg" alt="signin" />
                        </div>
                        <div className="col-lg-6">
                            <SignInForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
