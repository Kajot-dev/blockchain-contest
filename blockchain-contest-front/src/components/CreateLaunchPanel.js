import styles from "@styles/CreateLaunch/Panel.module.css";
import stylesList from "@styles/CreateLaunch/List.module.css";
import stylesBox from "@styles/CreateLaunch/Box.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { TextField, FormControl, Select, MenuItem } from "@mui/material";
import { Button } from "./Utils";

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
            autoComplete="off"
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
            autoComplete="off"
          />
          <TextField
            className={stylesBox.attribute}
            variant="standard"
            id="attribute"
            label="Attribute"
            placeholder="Attribute"
            onChange={(e) => setAttribute(e.target.value)}
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

// TODO: on click, open file explorer, get png, validate it, and update image
const ItemImage = () => {
  return (
    <div className={styles.itemImage}>
      <label className={styles.label}>
        <a className={styles.boxtext}>Item image</a>
      </label>
      <div className={stylesBox.itemImageBox}>
        <Image className={stylesBox.image} alt="" id="png" src="/png@2x.png" />
        <div className={stylesBox.imgButtonBox}>
          <Button interior={"+"} onClick={() => console.log("click")} />
        </div>
      </div>
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
      <div className={stylesBox.deployLaunchBoxCenter}>
        <div className={stylesBox.deployLaunchBox}>
          <div className={stylesBox.line}>
            <TextField
              className={stylesBox.date}
              variant="standard"
              id="date"
              label="Date"
              placeholder="mm/dd/yyyy"
              onChange={(e) => setDate(e.target.value)}
              autoComplete="off"
            />
            <TextField
              className={stylesBox.time}
              variant="standard"
              id="time"
              label="Time"
              placeholder="hh:mm"
              // onChange={(e) => setTime(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className={stylesBox.line}>
            <FormControl className={stylesBox.select} variant="standard">
              <Select label="Type">
                <MenuItem value={"FCFS"}>FCFS</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={stylesBox.line}>
            <Button interior={"Deploy"} />
          </div>
        </div>
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
    <div className={styles.main}>
      <div className={styles.launch}>
        <div className={styles.itemSection}>
          <ItemImage />
          <div className={styles.itemSectionLeft}>
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
              <div className={stylesBox.addItemBox}>
                <TextField
                  className={stylesBox.quantity}
                  variant="standard"
                  id="quantity"
                  label="Quantity"
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  width="208px"
                  autoComplete="off"
                />
                <TextField
                  className={stylesBox.trait}
                  variant="standard"
                  id="trait"
                  label="Trait"
                  placeholder="Trait"
                  onChange={(e) => setTrait(e.target.value)}
                  width="208px"
                  autoComplete="off"
                />
                <Button onClick={() => listAdd()} interior={"+"} />
              </div>
            </div>
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
                  <div className={stylesList.listRow} key={launch}>
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
    </div>
  );
}
