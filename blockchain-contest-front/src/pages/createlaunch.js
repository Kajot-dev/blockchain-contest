import CreateLaunchPanel from "@/components/CreateLaunchPanel"
import NavBar from "@/components/NavBar"

export default function CreateLaunch() {
  return (
    <>
      <NavBar displayWalletButton={false} />
      <main className="">
        <div className="fill">
          <div className="fill magic-bg" />
        </div>
        <CreateLaunchPanel />
      </main>
    </>
  )
}