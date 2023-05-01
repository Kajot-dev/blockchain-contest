import { Input, Select, Button, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import styles from "@styles/CreateLaunchPanel.module.css";

export default function CreateLaunchPanel() {
  return (
    <div className={styles.launch}>
      <div className={styles.launchSection} id="launch-section">
        <div className={styles.launchList}>
          <label className={styles.launchListText}>
            <a className={styles.launchList1}>Launch list</a>
          </label>
        </div>
        <div className={styles.deployLaunch}>
          <label className={styles.launchListText}>
            <a className={styles.launchList1}>Deploy launch</a>
          </label>
          <div className={styles.deployLaunchContainer}>
            <div className={styles.line}>
              <Input
                className={styles.inputflushed}
                variant="flushed"
                width="200px"
                placeholder="mm/dd/yyyy"
                w="200px"
              />
              <Input
                className={styles.inputflushed}
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
      </div>
      <div className={styles.itemSection} id="item-section">
        <div className={styles.itemImage}>
          <label className={styles.launchListText}>
            <a className={styles.launchList1}>Item image</a>
          </label>
          <img className={styles.pngIcon} alt="" id="png" src="/png@2x.png" />
          <IconButton
            className={styles.buttonsolidTextAndIcon}
            variant="solid"
            w="32px"
            colorScheme="blue"
            id="add"
            icon={<AddIcon />}
          />
        </div>
        <div className={styles.itemInfo}>
          <label className={styles.launchListText}>
            <a className={styles.launchList1}>Item info</a>
          </label>
          <div className={styles.line3}>
            <Input
              className={styles.inputflushed2}
              variant="flushed"
              width="542px"
              id="ipfs"
              placeholder="IPFS (optional)"
              w="542px"
            />
          </div>
          <div className={styles.line2}>
            <Input
              className={styles.inputflushed3}
              variant="flushed"
              width="330px"
              id="attribute"
              placeholder="Attribute"
              w="330px"
            />
            <Input
              className={styles.inputflushed4}
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
        <div className={styles.addItem}>
          <label className={styles.launchListText}>
            <a className={styles.launchList1}>Add item</a>
          </label>
          <Input
            className={styles.inputflushed6}
            variant="flushed"
            width="208px"
            id="quantity"
            placeholder="Quantity"
            w="208px"
          />
          <Input
            className={styles.inputflushed7}
            variant="flushed"
            width="208px"
            id="trait"
            placeholder="Trait"
            w="208px"
          />
          <IconButton
            className={styles.buttonsolidTextAndIcon1}
            variant="solid"
            w="32px"
            colorScheme="blue"
            id="add"
            icon={<AddIcon />}
          />
        </div>
      </div>
    </div>
  );
};
