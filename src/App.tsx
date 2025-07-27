import { Navigate, Route, Router } from "@solidjs/router";

import styles from "./App.module.css";

import { Home } from "./pages/Home";
import { SignIn, SignOut, SignUp } from "./pages/auth";
import { Search } from "./pages/Search";
import { Settings } from "./pages/Settings";
import { Friends } from "./pages/Friends";
import { User } from "./pages/User";
import { UserProvider } from "./contexts/user";
import { Requests } from "./pages/Requests";
import { ProfileProvider } from "./providers/ProfileProvider";
import { Chat } from "./pages/Chat";
import { Blocks } from "./pages/Blocks";

function App() {
  return (
    <UserProvider>
      <ProfileProvider>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/auth">
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-out" component={SignOut} />
          </Route>
          <Route path="/settings" component={Settings} />
          <Route path="/search" component={Search} />
          <Route path="/friends" component={Friends} />
          <Route path="/requests" component={Requests} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/u/:username" component={User} />
          <Route path="/c/:username" component={Chat} />
          <Route path="*" component={() => <Navigate href="/" />} />
        </Router>
      </ProfileProvider>
    </UserProvider>
  );
}

export default App;
