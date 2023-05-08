import { useState } from "react";
import Image from "next/image";
import { IpfsImage } from "react-ipfs-image";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  TextField,
  Button,
  OutlineButton,
  DatePicker,
  Select,
} from "./Forms";
import {
  TextAddFilled,
  NumberSymbolFilled,
  TagQuestionMarkFilled,
  AddSubtractCircleFilled,
  DataBarVerticalAddFilled,
  ProtocolHandlerFilled,
  CalendarClockFilled,
  ClockFilled,
  ImageRegular,
  ImageProhibitedRegular
} from "@fluentui/react-icons";
import styles from "@styles/CreateLaunch.module.css";
import stylesForm from "@styles/Forms.module.css";

// TODO: if ipfs provided, update photo
export function ItemInfo({
  setName,
  setAttribute,
  setSymbol,
  setIpfs,
  className = "",
  ...props
}) {
  return (
    <Form className={className} label="Item info" {...props}>
      <TextField
        type="text"
        id="name"
        desc="NFT Name"
        placeholder="Name"
        FluentIcon={TextAddFilled}
        onChange={(e) => setName(e.target.value)}
      />
      <div
        className="flexRow"
        style={{
          gap: "1rem",
        }}
      >
        <TextField
          type="text"
          id="symbol"
          desc="Symbol"
          placeholder="Symbol"
          FluentIcon={NumberSymbolFilled}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <TextField
          type="text"
          id="attribute"
          desc="Attribute"
          placeholder="Attribute"
          FluentIcon={TagQuestionMarkFilled}
          onChange={(e) => setAttribute(e.target.value)}
        />
      </div>
      <TextField
        type="text"
        id="ipfs"
        name="ipfs"
        desc={"IPFS link (optional)"}
        placeholder="ipfs://"
        FluentIcon={ProtocolHandlerFilled}
        className={stylesForm.basicInput}
        onChange={(e) => setIpfs(e.target.value)}
      />
    </Form>
  );
}

const ipfsRegex = /^ipfs:\/\/[a-zA-Z0-9/.]+$/;

// TODO: on click, open file explorer, get png, validate it, and update image
export function ItemImage({ className = "", ipfs = null, imageData = null, ...props }) {

  let contents = null;

  if (ipfs && ipfs.trim() !== "" && ipfsRegex.test(ipfs.trim())) {
    contents = (
      <IpfsImage hash={ipfs} width={250} height={250} />
    );
  } else if (imageData) {
    contents = (
      <Image src={imageData} alt="Uploaded image" width={250} height={250} />
    );
  } else {
    contents = (
      <ImageRegular style={{
        opacity: 0.5,
        width: "250px",
        height: "250px"
      }} />
    );
  }
  return (
    <Form className={className} label="Item image" style={{
      justifyContent: "center"
    }} {...props}>
      {contents}
      <Button onClick={() => console.log("click")} disabled={!!ipfs}>+</Button>
    </Form>
  );
}

export function AddItem({ className = "", onItemAdd = () => {} }) {
  const [quantity, setQuantity] = useState(0);
  const [trait, setTrait] = useState("");

  const [quantityError, setQuantityError] = useState(null);
  const [traitError, setTraitError] = useState(null);

  function addItem() {
    let error = false;

    if (Number.isNaN(quantity)) {
      setQuantityError("Invalid number");
      error = true;
    } else if (quantity <= 0) {
      setQuantityError("Quantity must be greater than 0");
      error = true;
    } else {
      setQuantityError(null);
    }

    if (trait === "") {
      setTraitError("Trait cannot be empty");
      error = true;
    } else {
      setTraitError(null);
    }

    if (error) return;
    // TODO: Validate fields
    onItemAdd({
      quantity: quantity,
      trait: trait,
    });
  }

  return (
    <Form className={className} label="Add item">
      <div
        className="flexRow"
        style={{
          gap: "1rem",
        }}
      >
        <TextField
          variant="standard"
          id="quantity"
          label="Quantity"
          desc="Quantity"
          placeholder="Quantity"
          errorMsg={quantityError}
          FluentIcon={AddSubtractCircleFilled}
          onChange={(e) => setQuantity(parseInt(e.target.value.trim()))}
        />
        <TextField
          variant="standard"
          id="trait"
          desc="Trait"
          label="Trait"
          placeholder="Trait"
          errorMsg={traitError}
          FluentIcon={DataBarVerticalAddFilled}
          onChange={(e) => setTrait(e.target.value.trim())}
        />
        <Button onClick={addItem} className={stylesForm.thin}>
          +
        </Button>
      </div>
    </Form>
  );
}

export function LaunchList({
  launches = [],
  onListRemove = () => {},
  className = "",
}) {
  return (
    <Form className={className} label="Launch list">
      <div
        className={`flexCol ${styles.listContainer}`}
        style={{
          justifyContent: "stretch",
          maxHeight: "600px",
          overflowY: "auto",
        }}
      >
        <div className={styles.listTable}>
          <div className={styles.listHeader}>
            <div className={`${styles.listHeaderCell} ${styles.listCell}`}>
              Quantity
            </div>
            <div className={`${styles.listHeaderCell} ${styles.listCell}`}>
              Trait
            </div>
            <div className={`${styles.listHeaderCell} ${styles.listCell}`}>
              Remove
            </div>
          </div>
          {launches.map((launch) => (
            <div className={styles.listRow} key={launch.id}>
              <div className={styles.listCell}>{launch.quantity}</div>
              <div className={styles.listCell}>{launch.trait}</div>
              <div
                className={styles.listCell}
                onClick={() => onListRemove(launch)} // REMOVE
              >
                <OutlineButton className={stylesForm.minor}>
                  DELETE
                </OutlineButton>
              </div>
            </div>
          ))}
        </div>
      </div>
      {launches.length === 0 && (
        <div
          className={stylesForm.subtle}
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          No items added
        </div>
      )}
    </Form>
  );
}

// TODO: on deploy click button, upload photo to ipfs, and integrate launch with smart contract
export function DeployLaunch({ className = "", date, setDate }) {
  return (
    <Form className={className} label="Deploy launch">
      <DatePicker
        showTimeInput
        desc="Launch Date"
        dateFormat="yyyy/MM/dd HH:mm"
        placeholderText="Date"
        FluentIcon={CalendarClockFilled}
        selected={date}
        onChange={(date) => setDate(date)}
        minDate={new Date()}
      />

      <Select
        options={[{ value: "FCFS", label: "FCFS" }]}
        FluentIcon={ClockFilled}
        desc="Launch Type"
      />
      <Button onClick={() => console.log("click")} className={stylesForm.major}>
        Deploy
      </Button>
    </Form>
  );
}

export default function CreateLaunchPanel({ className = "" }) {
  // ITEM INFO
  const [name, setName] = useState("");
  const [attribute, setAttribute] = useState("");
  const [symbol, setSymbol] = useState("");
  const [ipfs, setIpfs] = useState("");
  const [imageData, setImageData] = useState(null);

  // ITEM LIST
  const [launches, setLaunches] = useState([]);

  // LAUNCH CONFIG
  const [date, setDate] = useState(new Date());

  // LIST FUNCTIONS
  function onListAdd(launch) {
    console.log(launch);
    setLaunches(launches.concat({ id: uuidv4(), ...launch }));
  }

  function onListRemove(launch) {
    let launchesCopy = launches.concat();
    let launchIndex = launches.findIndex((l) => l.id === launch.id);
    if (launchIndex !== -1) {
      launchesCopy.splice(launchIndex, 1);
      setLaunches(launchesCopy);
    }
  }

  return (
    <div className={`${styles.launchGrid} ${className}`}>
      <ItemInfo
        setName={setName}
        setAttribute={setAttribute}
        setSymbol={setSymbol}
        setIpfs={setIpfs}
        className={`${styles.itemInfo} ${stylesForm.form} ${stylesForm.thin} ${stylesForm.left}`}
      />

      <ItemImage
        className={`${styles.itemImage} ${stylesForm.form} ${stylesForm.thin} ${stylesForm.spaceBetween}`}
        ipfs={ipfs}
        imageData={imageData}
      />

      <AddItem
        className={`${styles.addItem} ${stylesForm.form} ${stylesForm.thin} ${stylesForm.left}`}
        onItemAdd={onListAdd}
      />

      <DeployLaunch
        date={date}
        setDate={setDate}
        className={`${styles.deployLaunch} ${stylesForm.form} ${stylesForm.thin}`}
      />

      <LaunchList
        launches={launches}
        onListRemove={onListRemove}
        className={`${styles.launchList} ${stylesForm.form} ${stylesForm.thin} ${stylesForm.left}`}
      />
    </div>
  );
}
