import { useState, useRef, useCallback, useMemo, useEffect, Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { PulseLoader } from "react-spinners";
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
  MoneyRegular,
  CalendarClockFilled,
  ImageRegular,
  ImageProhibitedRegular,
} from "@fluentui/react-icons";
import styles from "@styles/CreateLaunch.module.css";
import stylesForm from "@styles/Forms.module.css";


class LaunchDeployPopup extends Component {
  constructor(props) {
    super(props);
  }
}

export function ItemInfo({
  onNameChange = () => {},
  onSymbolChange = () => {},
  onAttributeChange = () => {},
  onIpfsChange = () => {},
  onPriceChange = () => {},
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
        onChange={onNameChange}
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
          onChange={onSymbolChange}
        />
        <TextField
          type="text"
          id="attribute"
          desc="Attribute"
          placeholder="Attribute"
          FluentIcon={TagQuestionMarkFilled}
          onChange={onAttributeChange}
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
        onChange={onIpfsChange}
      />
      <TextField
        type="text"
        id="price"
        name="price"
        desc={"Price in ETH"}
        placeholder="0.0012 ETH"
        FluentIcon={MoneyRegular}
        className={stylesForm.basicInput}
        onChange={onPriceChange}
      />
    </Panel>
  );
}

const ipfsRegex = /^ipfs:\/\/[a-zA-Z0-9/.]+$/;

export function ItemImage({
  className = "",
  ipfs = null,
  onRawImageData = () => {},
  ...props
}) {
  const [ipfsImageData, setIpfsImageData] = useState(null);
  const [fileImageData, setFileImageData] = useState(null);
  const [imageState, setImageState] = useState("blank"); // ["blank", "loading", "loaded", "error"]

  const fileInput = useRef(null);

  const handleButtonClick = useCallback(() => {
    if (!fileInput.current) return;
    fileInput.current.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    setImageState("loading");
    reader.onload = (e) => {
      setFileImageData(e.target.result);
      setImageState("loaded");
    };
    reader.onerror = (e) => {
      setFileImageData(null);
      setImageState("error");
    };
    reader.readAsDataURL(file);
  }, []);

  //handle ipfs
  useEffect(() => {
    if (ipfs && ipfs.trim() !== "" && ipfsRegex.test(ipfs.trim())) {
      const abortController = new AbortController();
      let rawIpfs = ipfs.trim().substring(7);
      let ipfsUrl = `https://ipfs.io/ipfs/${rawIpfs}`;
      setImageState("loading");
      fetch(ipfsUrl, {
        signal: abortController.signal,
      })
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setIpfsImageData(e.target.result);
            setImageState("loaded");
          };
          reader.readAsDataURL(blob);
        })
        .catch((err) => {
          setIpfsImageData(null);
          setImageState("error");
        });

      return () => {
        abortController.abort();
      };
    } else {
      setIpfsImageData(null);
    }
  }, [ipfs]);

  //check for blank image
  useEffect(() => {
    if (!fileImageData && (!ipfs || ipfs.trim() !== "")) {
      setImageState("blank");
    }
  }, [fileImageData, ipfs]);

  const renderReadyImage = useCallback(() => {
    let imageData = ipfsImageData || fileImageData;
    return (
      <img src={imageData} alt="Uploaded image" width={250} height={250} />
    );
  }, [ipfsImageData, fileImageData]);

  const renderImage = useCallback(() => {
    switch (imageState) {
      case "blank":
        return (
          <ImageRegular
            style={{
              opacity: 0.5,
              width: "250px",
              height: "250px",
            }}
          />
        );
      case "loading":
        return <PulseLoader size={10} />;
      case "loaded":
        return renderReadyImage();
      case "error":
        return (
          <ImageProhibitedRegular
            style={{
              opacity: 0.5,
              width: "250px",
              height: "250px",
            }}
          />
        );
      default:
        return null;
    }
  }, [imageState, renderReadyImage]);

  return (
    <Panel
      className={className}
      label="Item image"
      style={{
        justifyContent: "center",
      }}
      {...props}
    >
      {renderImage()}
      <Button onClick={handleButtonClick} disabled={!!ipfs}>
        +
      </Button>
      <input
        type="file"
        accept="image/png, image/jpeg, image/gif"
        max={1}
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleFileChange}
      />
    </Panel>
  );
}

export function AddItem({ className = "", onItemAdd = () => {} }) {
  const quantity = useRef(0);
  const trait = useRef("");

  const [quantityError, setQuantityError] = useState(null);
  const [traitError, setTraitError] = useState(null);

  const addItem = useCallback(() => {
    let error = false;

    if (Number.isNaN(quantity.current)) {
      setQuantityError("Invalid number");
      error = true;
    } else if (quantity.current <= 0) {
      setQuantityError("Quantity must be greater than 0");
      error = true;
    } else {
      setQuantityError(null);
    }

    if (trait.current === "") {
      setTraitError("Trait cannot be empty");
      error = true;
    } else {
      setTraitError(null);
    }

    if (error) return;

    onItemAdd({
      quantity: quantity.current,
      trait: trait.current,
    });
  }, [onItemAdd]);

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
          onChange={(e) => (quantity.current = parseInt(e.target.value.trim()))}
        />
        <TextField
          variant="standard"
          id="trait"
          desc="Trait"
          label="Trait"
          placeholder="Trait"
          errorMsg={traitError}
          FluentIcon={DataBarVerticalAddFilled}
          onChange={(e) => (trait.current = e.target.value.trim())}
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
  const headers = useMemo(() => ["Quantity", "Trait", "Remove"], []);
  const noElements = useMemo(() => "No items added", []);

  return (
    <Panel className={className} label="Launch list">
      <Table
        style={{
          justifyContent: "stretch",
          maxHeight: "600px",
          overflowY: "auto",
        }}
        headers={headers}
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
        noElements={noElements}
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
  initialDate = new Date(Date.now() + 1000 * 60 * 10),
  initialReleaseNow = false,
  onDateChange = () => {},
  onReleaseNowChange = () => {},
}) {
  const [date, setDate] = useState(initialDate);
  const [releaseNow, setReleaseNow] = useState(initialReleaseNow);

  const dateChangeHandler = useCallback(
    (date) => {
      setDate(date);
      onDateChange(date);
    },
    [onDateChange]
  );

  const releaseNowChangeHandler = useCallback(
    (e) => {
      setReleaseNow(e.target.checked);
      onReleaseNowChange(e.target.checked);
    },
    [onReleaseNowChange]
  );

  return (
    <Panel className={className} label="Deploy launch">
      <DatePicker
        showTimeInput
        desc="Launch Date"
        dateFormat="yyyy/MM/dd HH:mm"
        placeholderText="Date"
        FluentIcon={CalendarClockFilled}
        selected={date}
        onChange={dateChangeHandler}
        minDate={new Date(Date.now() + 1000 * 60 * 10)}
        disabled={releaseNow}
      />

      <CheckBox
        label="Release as soon as possible"
        onChange={releaseNowChangeHandler}
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
  const name = useRef("");
  const attribute = useRef("");
  const symbol = useRef("");
  const [ipfs, setIpfs] = useState("");
  const rawImageData = useRef("");

  const nameChangeHandler = useCallback((e) => {
    name.current = e.target.value.trim();
  }, []);

  const attributeChangeHandler = useCallback((e) => {
    attribute.current = e.target.value.trim();
  }, []);

  const symbolChangeHandler = useCallback((e) => {
    symbol.current = e.target.value.trim();
  }, []);

  const ipfsChangeHandler = useCallback((e) => {
    setIpfs(e.target.value.trim());
  }, []);

  const rawImageDataChangeHandler = useCallback((imageData) => {
    rawImageData.current = imageData;
  }, []);

  // ITEM LIST
  const [launches, setLaunches] = useState([]);

  // LAUNCH CONFIG
  const date = useRef(new Date(Date.now() + 1000 * 60 * 10));
  const releaseNow = useRef(false);

  const dateChangeHandler = useCallback((date) => {
    date.current = date;
  }, []);

  const releaseNowChangeHandler = useCallback((state) => {
    releaseNow.current = state;
  }, []);

  // LIST FUNCTIONS
  const onListAdd = useCallback(
    (launch) => {
      setLaunches(launches.concat({ id: uuidv4(), ...launch }));
    },
    [launches]
  );

  const onListRemove = useCallback(
    (launch) => {
      let launchesCopy = launches.concat();
      let launchIndex = launches.findIndex((l) => l.id === launch.id);
      if (launchIndex !== -1) {
        launchesCopy.splice(launchIndex, 1);
        setLaunches(launchesCopy);
      }
    },
    [launches]
  );

  return (
    <div className={`${styles.launchGrid} ${className}`}>
      <ItemInfo
        onNameChange={nameChangeHandler}
        onAttributeChange={attributeChangeHandler}
        onSymbolChange={symbolChangeHandler}
        onIpfsChange={ipfsChangeHandler}
        className={`${styles.itemInfo} ${stylesForm.form} ${stylesForm.thin} ${stylesForm.left}`}
      />

      <ItemImage
        className={`${styles.itemImage} ${stylesForm.form} ${stylesForm.thin} ${stylesForm.spaceBetween}`}
        ipfs={ipfs}
        onRawImageData={rawImageDataChangeHandler}
      />

      <AddItem
        className={`${styles.addItem} ${stylesForm.form} ${stylesForm.thin} ${stylesForm.left}`}
        onItemAdd={onListAdd}
      />

      <DeployLaunch
        initialDate={date.current}
        onDateChange={dateChangeHandler}
        initialReleaseNow={releaseNow.current}
        onReleaseNowChange={releaseNowChangeHandler}
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
