import { Input, IconButton, Select, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import styles from "@styles/CreateLaunchPanel.module.css";
import stylesList from "@styles/LaunchList.module.css";
import { useState } from "react";

export default function CreateLaunchPanel() {
  const [launches, setLaunches] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [trait, setTrait] = useState("");

  const handleAdd = () => {
    if (quantity === 0 || trait === "") return;
    setLaunches([...launches, { id: Date.now(), quantity, trait }]);
  };

  const handleRemove = (id) => {
    setLaunches(launches.filter((launch) => launch.id !== id));
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
            <Input
              className={styles.datetime}
              variant="flushed"
              width="200px"
              placeholder="mm/dd/yyyy"
              w="200px"
              id="date"
            />
            <Input
              className={styles.datetime}
              variant="flushed"
              width="164px"
              id="time"
              placeholder="hh:mm"
              w="164px"
            />
          </div>
          <Select
            variant="flushed"
            w="396px"
            id="type"
            placeholder="FCFS"
            backgroundColor="rgba(25, 192, 25, 0)"
          />
          <Button variant="solid" colorScheme="blue" id="deploy">
            Deploy
          </Button>
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
        <IconButton
          className={styles.addButton}
          variant="solid"
          w="32px"
          colorScheme="blue"
          id="add"
          icon={<AddIcon />}
        />
      </div>
    );
  };

  // id: ipfs, attribute, symbol, name
  const ItemInfo = () => {
    return (
      <div className={styles.itemInfo}>
        <label className={styles.label}>
          <a className={styles.boxtext}>Item info</a>
        </label>
        <div className={styles.line1}>
          <Input
            className={styles.ipfs}
            variant="flushed"
            width="542px"
            id="name"
            size="md"
            placeholder="Name"
            w="542px"
          />
        </div>

        <div className={styles.line2}>
          <Input
            className={styles.attribute}
            variant="flushed"
            width="330px"
            id="attribute"
            placeholder="Attribute"
            w="330px"
            position="absolute"
          />
          <Input
            className={styles.symbol}
            variant="flushed"
            width="180px"
            id="symbol"
            size="md"
            placeholder="Symbol"
            w="180px"
          />
        </div>
        <div className={styles.line3}>
          <Input
            className={styles.ipfs}
            width="542px"
            id="ipfs"
            placeholder="IPFS (optional)"
            w="542px"
            variant="flushed"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.launch}>
      <div className={styles.launchSection}>
        <DeployLaunch />

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
                    onClick={() => handleRemove(launch.id)} // REMOVE
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.itemSection}>
        <ItemImage />

        <ItemInfo />

        <div className={styles.addItem}>
          <label className={styles.label}>
            <a className={styles.boxtext}>Add item</a>
          </label>
          <Input
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)} // SET QUANTITY
            variant="flushed"
            width="208px"
            id="quantity"
            placeholder="Quantity"
            w="208px"
            position="absolute"
          />
          <Input
            className={styles.trait}
            onChange={(e) => setTrait(e.target.value)} // SET TRAIT
            width="208px"
            id="trait"
            placeholder="Trait"
            w="208px"
            variant="flushed"
            position="absolute"
          />
          <IconButton
            className={styles.addButton2}
            onClick={() => handleAdd()} // ADD
            w="32px"
            colorScheme="blue"
            id="add"
            icon={<AddIcon />}
            position="absolute"
          />
        </div>
      </div>
    </div>
  );
}
