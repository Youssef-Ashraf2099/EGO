import Hero from "./main page/hero"
import EventListing from "./main page/EventListing"
import CreateEvent from "./main page/CreateEvent"

const HomePage = () => {
  return (
    <>
      <Hero />
      <EventListing isHome={true} />
      <CreateEvent />
    </>
  )
}

export default HomePage
