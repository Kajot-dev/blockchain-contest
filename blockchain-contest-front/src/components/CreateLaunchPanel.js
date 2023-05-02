import { Input, Select, Button, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import styles from "@styles/CreateLaunchPanel.module.css";
import stylesList from "@styles/LaunchList.module.css";

export default function CreateLaunchPanel() {
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

  // id: item info, ipfs, attribute, symbol, name
  const ItemInfo = () => {
    return (
      <div className={styles.itemInfo}>
        <label className={styles.label}>
          <a className={styles.boxtext}>Item info</a>
        </label>
        <div className={styles.line3}>
          <Input
            className={styles.ipfs}
            variant="flushed"
            width="542px"
            id="ipfs"
            placeholder="IPFS (optional)"
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
        <div className={styles.line1}>
          <Input
            className={styles.inputflushed2}
            variant="flushed"
            width="542px"
            id="name"
            size="md"
            placeholder="Name"
            w="542px"
          />
        </div>
      </div>
    );
  };

  // id: quantity, trait, add
  const AddItem = () => {
    return (
      <div className={styles.addItem}>
        <label className={styles.label}>
          <a className={styles.boxtext}>Add item</a>
        </label>
        <Input
          className={styles.quantity}
          variant="flushed"
          width="208px"
          id="quantity"
          placeholder="Quantity"
          w="208px"
        />
        <Input
          className={styles.trait}
          variant="flushed"
          width="208px"
          id="trait"
          placeholder="Trait"
          w="208px"
        />
        <IconButton
          className={styles.addButton2}
          variant="solid"
          w="32px"
          colorScheme="blue"
          id="add"
          icon={<AddIcon />}
        />
      </div>
    );
  };

  const LaunchList = () => {
    const generateElement = (quantity, trait) => {
      return (
        <div className={stylesList.listRow}>
          <div className={stylesList.quantity}>{quantity}</div>
          <div className={stylesList.trait}>{trait}</div>
          <div className={stylesList.delete}></div>
        </div>
      );
    };

    const List = () => {
      return (
        <div className={stylesList.listContainer}>
          <div className={stylesList.listBody}>
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
            {generateElement(5, "Lorem ipsum dolor sit amet")}
          </div>
        </div>
      );
    };

    return (
      <div className={styles.launchList}>
        <label className={styles.label}>
          <a className={styles.boxtext}>Launch list</a>
        </label>
        <List />
      </div>
    );
  };

  return (
    <div className={styles.launch}>
      <div className={styles.launchSection}>
        <DeployLaunch />

        <LaunchList />
      </div>
      <div className={styles.itemSection}>
        <ItemImage />

        <ItemInfo />

        <AddItem />
      </div>
    </div>
  );
}
