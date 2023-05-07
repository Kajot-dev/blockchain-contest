import NavBar from "@/components/NavBar"
import ConnectForm from "@/components/ConnectForm"

export default function Connect() {
  return (
    <>
      <NavBar displayConnectButton={false} />
      <main className="">
        <div className="fill">
          <div className="fill magic-bg" />
        </div>
        <ConnectForm />
      </main>
    </>
  )
}