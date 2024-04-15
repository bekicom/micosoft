import React, {  useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import axios from "axios";

export default function CreateProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [storageType, setStorageType] = useState("");
  const [storageSize, setStorageSize] = useState("");
  const [screenSize, setScreenSize] = useState(""); // State for storing screen size

  const categories = ["Noutbok", "Option 2", "Option 3"];
  const noutbookBrands = [
    "Acer", "Macbook", "Dell", "HP", "Lenovo", "Asus", "Samsung", "MSI", 
    "Microsoft", "Huawei", "Toshiba", "LG", "Razer", "Sony", "Google", 
    "Fujitsu", "Alienware", "Xiaomi", "Gigabyte", "Panasonic"
  ];
  const intelcore = ["core i3", "core i5", "core i7", "core i9"];
  const avlodi = ["2-avlod", "3-avlod", "4-avlod", "5-avlod", "6-avlod", 
                  "7-avlod", "8-avlod", "9-avlod", "10-avlod", "11-avlod", 
                  "12-avlod", "13-avlod", "14-avlod", "15-avlod"];
  const ssdSizes = ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"];
  const hddSizes = ["250GB", "500GB", "1TB", "2TB", "4TB", "6TB", "8TB", "10TB"];
  const screenSizes = ["13.3", "14", "15.6", "16"];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setProduct(""); 
    setStorageType(""); 
    setScreenSize(""); 
  };

  const handleStorageTypeChange = (e) => {
    setStorageType(e.target.value);
    setStorageSize(""); 
  };

  const handleSave = () => {
    const productData = {
      category: category,
      product: product,
      storageType: storageType,
      storageSize: storageSize,
      screenSize: screenSize
    };
    onClose()
    
    axios.post("https://61fcfec8f62e220017ce4280.mockapi.io/kiyim-kechak/qishkiKiyimlar", productData)
      .then(response => {
        console.log("Ma'lumotlar yuborildi:", response.data);
      })
      .catch(error => {
        console.error("Xatolik:", error);
      });
  };

  return (
    <div className="create-product">
      <nav>
        <Button onClick={onOpen} colorScheme="blue">
          Yangi Tavar qo'shish +
        </Button>
      </nav>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Select
              placeholder="Katigoryani tanlang"
              mt={3}
              value={category}
              onChange={handleCategoryChange}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            {category === "Noutbok" && (
              <>
                <Select placeholder="Markani tanlang" mt={3}>
                  {noutbookBrands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Select>
                <Select placeholder="Protsesori" mt={3}>
                  {intelcore.map((core, index) => (
                    <option key={index} value={core}>
                      {core}
                    </option>
                  ))}
                </Select>
                <Select placeholder="Avlodi" mt={3}>
                  {avlodi.map((avlod, index) => (
                    <option key={index} value={avlod}>
                      {avlod}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder="Xotira Turini Tanlang"
                  mt={3}
                  value={storageType}
                  onChange={handleStorageTypeChange}
                >
                  <option value="SSD">SSD</option>
                  <option value="HDD">HDD</option>
                </Select>
                {storageType === "SSD" && (
                  <Select
                    placeholder="Xotira O'lchamini Tanlang"
                    mt={3}
                    value={storageSize}
                    onChange={(e) => setStorageSize(e.target.value)}
                  >
                    {ssdSizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </Select>
                )}
                {storageType === "HDD" && (
                  <Select
                    placeholder="Xotira O'lchamini Tanlang"
                    mt={3}
                    value={storageSize}
                    onChange={(e) => setStorageSize(e.target.value)}
                  >
                    {hddSizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </Select>
                )}
                <Select
                  placeholder="Ekran Razmerni Tanlang"
                  mt={3}
                  value={screenSize}
                  onChange={(e) => setScreenSize(e.target.value)}
                >
                  {screenSizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}" 
                    </option>
                  ))}
                </Select>
              </>
            )}
            <Input placeholder="Narxi" mt={3} />
          
          </ModalBody>

          <ModalFooter>
            <Button   colorScheme="blue" onClick={handleSave}>Saqlash</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
