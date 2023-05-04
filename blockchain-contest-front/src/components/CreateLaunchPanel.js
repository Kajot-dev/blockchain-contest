import styles from "@styles/CreateLaunch/Panel.module.css";
import stylesList from "@styles/CreateLaunch/List.module.css";
import stylesBox from "@styles/CreateLaunch/Box.module.css";
import { useState } from "react";
import { TextField } from "@mui/material";
import { FormControl, Select, MenuItem } from "@mui/material";

// TODO: if ipfs provided, update photo
const ItemInfo = ({ setName, setAttribute, setSymbol, setIpfs }) => {
  return (
    <div className={styles.itemInfo}>
      <label className={styles.label}>
        <a className={styles.boxtext}>Item info</a>
      </label>
      <div className={stylesBox.itemInfoBox}>
        <div className={stylesBox.line1}>
          <TextField
            className={stylesBox.name}
            variant="standard"
            id="name"
            label="Name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={stylesBox.line2}>
          <TextField
            className={stylesBox.symbol}
            variant="standard"
            id="symbol"
            label="Symbol"
            placeholder="Symbol"
            onChange={(e) => setSymbol(e.target.value)}
          />
          <TextField
            className={stylesBox.attribute}
            variant="standard"
            id="attribute"
            label="Attribute"
            placeholder="Attribute"
            onChange={(e) => setAttribute(e.target.value)}
          />
        </div>
        <div className={stylesBox.line3}>
          <TextField
            className={stylesBox.ipfs}
            id="ipfs"
            label="IPFS"
            placeholder="IPFS (optional)"
            variant="standard"
            onChange={(e) => setIpfs(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// TODO: on click, open file explorer, get png, validate it, and update image
const ItemImage = (func) => {
  return (
    <div className={styles.itemImage}>
      <label className={styles.label}>
        <a className={styles.boxtext}>Item image</a>
      </label>
      <img className={styles.pngIcon} alt="" id="png" src="/png@2x.png" />
      <button className="addImageButton" onClick={() => func()} />
    </div>
  );
};

// TODO: on deploy click button, upload photo to ipfs, and integrate launch with smart contract
const DeployLaunch = () => {
  return (
    <div className={styles.deployLaunch}>
      <label className={styles.label}>
        <a className={styles.boxtext}>Deploy launch</a>
      </label>
      <div className={styles.deployLaunchContainer}>
        <div className={styles.line}>
          <TextField
            className={styles.datetime}
            variant="standard"
            width="200px"
            id="date"
            label="Date"
            placeholder="mm/dd/yyyy"
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            className={styles.datetime}
            variant="standard"
            width="164px"
            id="time"
            label="Time"
            placeholder="hh:mm"
            // onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select label="Type">
            <MenuItem value={"FCFS"}>FCFS</MenuItem>
          </Select>
        </FormControl>
        <button className="deployButton" id="deploy" />
      </div>
    </div>
  );
};

export default function CreateLaunchPanel() {
  // ADD ITEM - LIST
  const [launches, setLaunches] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [trait, setTrait] = useState("");

  // ITEM INFO
  const [name, setName] = useState("");
  const [attribute, setAttribute] = useState("");
  const [symbol, setSymbol] = useState("");
  const [ipfs, setIpfs] = useState("");

  // LIST FUNCTIONS
  const listAdd = () => {
    if (quantity === 0 || trait === "") return;
    setLaunches([...launches, { id: Date.now(), quantity, trait }]);
  };
  const listRemove = (id) => {
    setLaunches(launches.filter((launch) => launch.id !== id));
  };

  return (
    <div className={styles.launch}>
      <div className={styles.itemSection}>
        <ItemImage />

        <ItemInfo
          setName={setName}
          setAttribute={setAttribute}
          setSymbol={setSymbol}
          setIpfs={setIpfs}
        />

        {/* ADD ITEM */}
        <div className={styles.addItem}>
          <label className={styles.label}>
            <a className={styles.boxtext}>Add item</a>
          </label>
          <TextField
            className={styles.quantity}
            variant="standard"
            id="quantity"
            label="Quantity"
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            width="208px"
          />
          <TextField
            className={styles.trait}
            variant="standard"
            id="trait"
            label="Trait"
            placeholder="Trait"
            onChange={(e) => setTrait(e.target.value)}
            width="208px"
          />
          <button
            className={styles.addItemButton}
            onClick={() => listAdd()} // ADD
          />
        </div>
      </div>
      <div className={styles.launchSection}>
        <DeployLaunch />

        {/* LAUNCH LIST */}
        <div className={styles.launchList}>
          <label className={styles.label}>
            <a className={styles.boxtext}>Launch list</a>
          </label>
          <div className={stylesList.listContainer}>
            <div className={stylesList.listBody}>
              {launches.map((launch) => (
                <div className={stylesList.listRow}>
                  <div className={stylesList.quantity}>{launch.quantity}</div>
                  <div className={stylesList.trait}>{launch.trait}</div>
                  <div
                    className={stylesList.delete}
                    onClick={() => listRemove(launch.id)} // REMOVE
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
