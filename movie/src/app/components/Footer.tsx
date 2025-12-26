export const Footer = () => {
  return (
    <div className="flex bg-purple-600 w-dvw h-70 justify-center items-center text-white">
      <div className="flex w-[1280] h-50 justify-between">
        <div className="flex flex-col gap-4">
          <button className="logo">
            <img className="flex h-5" src="footerLogo.png" alt="" />
          </button>
          © 2024 Movie Z. All Rights Reserved.
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col gap-4">
            <div>Contact Information</div>
            <div className="flex flex-row gap-3 items-center">
              <img className="w-4 h-3" src="email.png" alt="" />
              <div className="flex flex-col gap">
                <h2>Email:</h2>
                <button>support@movieZ.com</button>
              </div>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <img className="w-4 h-4" src="phone.png" alt="" />
              <div>
                <h2>Phone:</h2>
                <button>+976 (11) 123-4567</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>Follow us</div>
            <div className="flex gap-4">
              <button>Facebook</button>
              <button>Instagram</button>
              <button>Twitter</button>
              <button>Youtube</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
