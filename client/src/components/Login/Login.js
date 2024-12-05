function Login() {
    return (
        <div class="Login">
        <div class="top-right">
        <a href="#" id="register-button" class="register-link">Đăng ký</a>
        </div>

        <div class="container">
        
        <div class="form-box login-form active" id="login-form">
            <img src="img/logo.png" alt="Logo" class="logo" />
            <h2>Đăng nhập QAirline Club</h2>
            <form>
            <label for="member-id">Số hội viên</label>
            <input type="text" id="member-id" placeholder="Số hội viên của bạn" />

            <label for="password">Mật khẩu</label>
            <input type="password" id="password" placeholder="Mật khẩu" />

            <div class="options">
                <label><input type="checkbox" /> Lưu thông tin</label>
                <a href="#" id="forgot-password-link">Quên Mật Khẩu?</a>
            </div>

            <button type="button" class="btn">Đăng Nhập</button>
            </form>
        </div>

        
        <div class="form-box forgot-password-form" id="forgot-password-form">
            <img src="img/logo.png" alt="Logo" class="logo" />
            <h2>Quên mật khẩu?</h2>
            <p>Vui lòng nhập email đã đăng ký tài khoản QAirline Club.</p>
            <form>
            <label for="email">Email đã đăng ký</label>
            <input type="email" id="email" placeholder="Email của bạn" />

            <label for="otp">OTP</label>
            <div class="otp-group">
                <input type="text" id="otp" placeholder="Mã OTP" />
                <button type="button" class="btn" id="send-otp">Gửi OTP</button>
            </div>

            <label for="new-password">Mật khẩu mới</label>
            <input type="password" id="new-password" placeholder="Mật khẩu mới" />

            <label for="confirm-password">Xác nhận mật khẩu mới</label>
            <input
                type="password"
                id="confirm-password"
                placeholder="Điền lại mật khẩu mới"
            />

            <button type="button" class="btn">Gửi</button>
            </form>
            <a href="#" id="back-login-link-forgot">Quay lại Đăng nhập</a>
        </div>

        
        <div class="form-box register-form" id="register-form">
            <img src="img/logo.png" alt="Logo" class="logo" />
            <h2>Đăng ký QAirline Club</h2>
            <form>
            <label for="name">Họ và tên</label>
            <input type="text" id="name" placeholder="Nhập họ và tên" />

            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Nhập email của bạn" />

            <label for="phone">Số điện thoại</label>
            <input type="text" id="phone" placeholder="Nhập số điện thoại" />

            <label for="password-register">Mật khẩu</label>
            <input
                type="password"
                id="password-register"
                placeholder="Nhập mật khẩu"
            />

            <label for="confirm-password">Xác nhận mật khẩu</label>
            <input
                type="password"
                id="confirm-password"
                placeholder="Điền lại mật khẩu"
            />

            <button type="button" class="btn">Đăng Ký</button>
            </form>
            <a href="#" id="back-login-link-register">Quay lại Đăng nhập</a>
        </div>
        </div>
    </div>
    );
 
} 
export default Login;