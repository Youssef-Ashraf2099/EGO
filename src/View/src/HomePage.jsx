import Hero from "./main page/hero";
import EventListing from "./main page/EventListing";
import CreateEvent from "./main page/CreateEvent";
import { useAuth } from "./AuthContext";

const HomePage = () => {
  const { role } = useAuth();

  return (
    <>
      <Hero />
      <EventListing isHome={true} />
      {/* Only show CreateEvent for Organizer or System Admin */}
      {role === "Organizer" && <CreateEvent />}
    </>
  );
};

export default HomePage;