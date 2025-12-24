export const Footer = () => {
  return (
    <div className="flex bg-purple-600 w-dvw h-70 justify-center items-center text-white">
      <div className="flex w-[1280] h-50 justify-between">
        <div className="flex flex-col gap-4">
          <button className="logo">
            <img className="" src="Logo.png" alt="" />
          </button>
          © 2024 Movie Z. All Rights Reserved.
        </div>
        <div className="flex">
          <div>Contact Information</div>
          <div>Follow us</div>
        </div>
      </div>
    </div>
  )
}
