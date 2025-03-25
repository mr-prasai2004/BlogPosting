const SidebarItem = ({ icon, text, isSidebarOpen }) => (
    <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
      {icon}
      <span className={`${isSidebarOpen ? 'ml-4 block' : 'hidden'} text-gray-700`}>{text}</span>
    </div>
  );