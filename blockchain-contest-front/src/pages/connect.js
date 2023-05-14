import NavBar from "@/components/NavBar"
import ConnectForm from "@/components/ConnectForm"

export default function Connect() {
  return (
    <>
      <NavBar displayConnectButton={false} />
      <main>
        <div className="fill-bg">
          <div className="fill magic-bg" />
        </div>
        <ConnectForm />
      </main>
    </>
  )
}