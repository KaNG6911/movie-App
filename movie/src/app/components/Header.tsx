export const Header = () => {
  return (
    <div className="flex w-vw h-15 bg-white justify-center items-center pl-30 pr-30">
      <div className="flex flex-row justify-between w-dvw ">
        <button>
          <img src="Logo.png" alt="" />
        </button>
        <div className="flex flex-row gap-10">
          <button>Genre </button>
          <input
            className="flex pl-5 border-gray-400 border rounded-[10]"
            type="search"
            placeholder=" Search... "
          />
        </div>
        <button>
          <img src="darkTheme.png" alt="" />
        </button>
      </div>
    </div>
  )
}
