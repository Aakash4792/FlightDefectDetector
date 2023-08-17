import { Outlet } from "react-router-dom";
function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      {/* {navigation.state === "loading" && <p>Loading....</p>} */}
      <Outlet />
    </>
  );
}

export default RootLayout;
