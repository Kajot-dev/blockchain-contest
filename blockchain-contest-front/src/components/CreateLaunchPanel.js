import { useState, useRef } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {
  Panel,
  TextField,
  Button,
  OutlineButton,
  DatePicker,
  CheckBox,
} from "./Forms";
import Table from "./Table";
import { InfoBox } from "./Utils";
import {
  TextAddFilled,
  NumberSymbolFilled,
  TagQuestionMarkFilled,
  AddSubtractCircleFilled,
  DataBarVerticalAddFilled,
  ProtocolHandlerFilled,
  CalendarClockFilled,
  ImageRegular,
  ImageProhibitedRegular,
} from "@fluentui/react-icons";
import styles from "@styles/CreateLaunch.module.css";
import stylesForm from "@styles/Forms.module.css";

export function ItemInfo({
  setName,
  setAttribute,
  setSymbol,
  setIpfs,
  className = "",
  ...props
}) {
  return (
    <Panel className={className} label="Item info" {...props}>
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
    </Panel>
  );
}

const ipfsRegex = /^ipfs:\/\/[a-zA-Z0-9/.]+$/;

// TODO: on click, open file explorer, get png, validate it, and update image
export function ItemImage({ className = "", ipfs = null, ...props }) {
  let contents = null;

  const [imageData, setImageData] = useState(null);

  const fileInput = useRef(null);

  function handleButtonClick() {
    if (!fileInput.current) return;
    fileInput.current.click();
  }

  function handleFileChange(e) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageData(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  if (ipfs && ipfs.trim() !== "" && ipfsRegex.test(ipfs.trim())) {
    let rawIpfs = ipfs.trim().substring(7);
    contents = (
      <Image
        src={`https://ipfs.io/ipfs/${rawIpfs}`}
        alt="Image from url"
        width={250}
        height={250}
      />
    );
  } else if (imageData) {
    contents = (
      <Image src={imageData} alt="Uploaded image" width={250} height={250} />
    );
  } else {
    contents = (
      <ImageRegular
        style={{
          opacity: 0.5,
          width: "250px",
          height: "250px",
        }}
      />
    );
  }
  return (
    <Panel
      className={className}
      label="Item image"
      style={{
        justifyContent: "center",
      }}
      {...props}
    >
      {contents}
      <Button onClick={handleButtonClick} disabled={!!ipfs}>
        +
      </Button>
      <input
        type="file"
        accept="image/png, image/jpeg"
        max={1}
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleFileChange}
      />
    </Panel>
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
    <Panel className={className} label="Add item">
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
    </Panel>
  );
}

export function LaunchList({
  launches = [],
  onListRemove = () => {},
  className = "",
}) {
  return (
    <Panel className={className} label="Launch list">
      <Table
        style={{
          justifyContent: "stretch",
          maxHeight: "600px",
          overflowY: "auto",
        }}
        headers={["Quantity", "Trait", "Remove"]}
        data={launches.map((launch) => [
          launch.quantity,
          launch.trait,
          <OutlineButton
            key={launch.id}
            onClick={() => onListRemove(launch)}
            className={stylesForm.thin}
          >
            DELETE
          </OutlineButton>,
        ])}
        noElements={"No items added"}
        noElementsStyle={{
          textAlign: "center",
          width: "100%",
        }}
      />
    </Panel>
  );
}

// TODO: on deploy click button, upload photo to ipfs, and integrate launch with smart contract
export function DeployLaunch({
  className = "",
  date,
  setDate,
  releaseNow = false,
  setReleaseNow = () => {},
}) {
  return (
    <Panel className={className} label="Deploy launch">
      <DatePicker
        showTimeInput
        desc="Launch Date"
        dateFormat="yyyy/MM/dd HH:mm"
        placeholderText="Date"
        FluentIcon={CalendarClockFilled}
        selected={date}
        onChange={(date) => setDate(date)}
        minDate={new Date(Date.now() + 1000 * 60 * 10)}
        disabled={releaseNow}
      />

      <CheckBox
        label="Release as soon as possible"
        onChange={(e) => setReleaseNow(e.target.checked)}
      />

      <InfoBox text="The launch will be deployed on First Come First Serve basis. The first person to buy the NFT will get it." />

      <Button onClick={() => console.log("click")} className={stylesForm.major}>
        Deploy
      </Button>
    </Panel>
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
  const [releaseNow, setReleaseNow] = useState(false);

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
        releaseNow={releaseNow}
        setReleaseNow={setReleaseNow}
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
