import { X } from "lucide-react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';  
export default function LoginModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post('http://localhost:4000/api/auth/google', {
          credential: tokenResponse.credential,
        }, { withCredentials: true });

        console.log("User:", res.data);
      } catch (err) {
        console.error("Login failed", err);
      }
    },
    onError: () => console.log("Login Failed"),
  });
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative shadow-lg">
                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                    <X size={24} />
                </button>

                <h2
                    className="mt-[10px] relative top-[20px] text-[40px] font-bold pb-[20px] bg-gradient-to-r from-[#009680] via-[#009688] to-[#009695] 
                    bg-clip-text text-transparent text-center mb-10"> Đăng nhập
                </h2>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                    />
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none"
                        />
                        <span className="absolute right-4 top-2.5 text-sm text-gray-500 cursor-pointer">Hiện</span>
                    </div>

                    <div className="text-right">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Quên mật khẩu?</a>
                    </div>

                    <button type="submit" className="bg-[#009689] w-full py-2 rounded-lg text-white font-bold hover:bg-[#009699] transition cursor-pointer">
                        Đăng nhập
                    </button>
                </form>

                <p className="text-center mt-4 text-sm">
                    Tạo tài khoản mới <a href="#" className="text-blue-500 hover:underline">Nhấn vào đây</a>
                </p>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">Hoặc</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button
                    onClick={login}
                    className="mb-20 mt-10 w-full h-13 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        className="w-5 h-5"
                        alt="Google"
                    />
                    <span className="font-medium text-sm">Tiếp tục với Google</span>
                </button>
            </div>
        </div>
    );
}
