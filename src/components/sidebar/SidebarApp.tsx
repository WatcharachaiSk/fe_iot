import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import { BiHome, BiMenu, BiTachometer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FiDatabase } from "react-icons/fi";

function SidebarApp() {
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<BiMenu size={20} />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          <h2>IOT</h2>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/dashboard");
          }}
          icon={<BiTachometer size={20} />}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/data");
          }}
          icon={<FiDatabase size={20} />}
        >
          Data
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarApp;

/*
icon={<HomeOutlinedIcon />}
icon={<PeopleOutlinedIcon />}
icon={<ContactsOutlinedIcon />}
icon={<ReceiptOutlinedIcon />}
icon={<HelpOutlineOutlinedIcon />}
icon={<CalendarTodayOutlinedIcon />}
*/
