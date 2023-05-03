import styles from "@styles/CreateLaunch/Panel.module.css";
import stylesList from "@styles/CreateLaunch/List.module.css";
import { useState } from "react";
import { TextField } from "@mui/material";
import { FormControl, Select, MenuItem } from "@mui/material";

export default function CreateLaunchPanel() {
  // ADD ITEM - LIST
  const [launches, setLaunches] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [trait, setTrait] = useState("");

  // DEPLOY
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");

  // ITEM INFO
  const [name, setName] = useState("");
  const [attribute, setAttribute] = useState("");
  const [symbol, setSymbol] = useState("");
  const [ipfs, setIpfs] = useState("");

  const listAdd = () => {
    if (quantity === 0 || trait === "") return;
    setLaunches([...launches, { id: Date.now(), quantity, trait }]);
  };

  const listRemove = (id) => {
    setLaunches(launches.filter((launch) => launch.id !== id));
  };

  // id: ipfs, attribute, symbol, name
  // TODO: add ipfs - update photo to ipfs
  const ItemInfo = (setName, setAttribute, setSymbol, setIpfs) => {
    return (
      <div className={styles.itemInfo}>
        <label className={styles.label}>
          <a className={styles.boxtext}>Item info</a>
        </label>
        <div className={styles.line1}>
          <TextField
            className={styles.name}
            variant="standard"
            width="542px"
            id="name"
            label="Name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.line2}>
          <TextField
            className={styles.attribute}
            variant="standard"
            width="330px"
            id="attribute"
            label="Attribute"
            placeholder="Attribute"
            onChange={(e) => setAttribute(e.target.value)}
          />
          <TextField
            className={styles.symbol}
            variant="standard"
            width="180px"
            id="symbol"
            label="Symbol"
            placeholder="Symbol"
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <div className={styles.line3}>
          <TextField
            className={styles.ipfs}
            width="542px"
            id="ipfs"
            label="IPFS"
            placeholder="IPFS (optional)"
            variant="standard"
            onChange={(e) => setIpfs(e.target.value)} // TODO: add ipfs
          />
        </div>
      </div>
    );
  };

  // id: png, add
  const ItemImage = () => {
    return (
      <div className={styles.itemImage}>
        <label className={styles.label}>
          <a className={styles.boxtext}>Item image</a>
        </label>
        <img className={styles.pngIcon} alt="" id="png" src="/png@2x.png" />
        <button className="addImageButton" />
      </div>
    );
  };

  // id: date, time, type, deploy
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
