import React, { useState } from "react";
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
  const [formData, setFormData] = useState({
    category: "",
    brand: "",
    processor: "",
    avlod: "",
    storageType: "",
    storageSize: "",
    screenSize: "",
    price: "",
  });

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
    setFormData({
      ...formData,
      category: e.target.value,
      brand: "",
      processor: "",
      avlod: "",
      storageType: "",
      storageSize: "",
      screenSize: "",
      price: "",
    });
  };

  const handleStorageTypeChange = (e) => {
    setFormData({
      ...formData,
      storageType: e.target.value,
      storageSize: "",
    });
  };

  const handleSave = () => {
    onClose();
    
    axios.post("http://localhost:5000/api/user/add", formData)
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
                value={formData.category}
                onChange={handleCategoryChange}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              {formData.category === "Noutbok" && (
                <>
                  <Select 
                    placeholder="Markani tanlang" 
                    mt={3} 
                    value={formData.brand} 
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  >
                    {noutbookBrands.map((brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </Select>
                  <Select 
                    placeholder="Protsesori" 
                    mt={3} 
                    value={formData.processor} 
                    onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
                  >
                    {intelcore.map((core, index) => (
                      <option key={index} value={core}>
                        {core}
                      </option>
                    ))}
                  </Select>
                  <Select 
                    placeholder="Avlodi" 
                    mt={3} 
                    value={formData.avlod} 
                    onChange={(e) => setFormData({ ...formData, avlod: e.target.value })}
                  >
                    {avlodi.map((avlod, index) => (
                      <option key={index} value={avlod}>
                        {avlod}
                      </option>
                    ))}
                  </Select>
                  <Select
                    placeholder="Xotira Turini Tanlang"
                    mt={3}
                    value={formData.storageType}
                    onChange={handleStorageTypeChange}
                  >
                    <option value="SSD">SSD</option>
                    <option value="HDD">HDD</option>
                  </Select>
                  {formData.storageType === "SSD" && (
                    <Select
                      placeholder="Xotira O'lchamini Tanlang"
                      mt={3}
                      value={formData.storageSize}
                      onChange={(e) => setFormData({ ...formData, storageSize: e.target.value })}
                    >
                      {ssdSizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </Select>
                  )}
                  {formData.storageType === "HDD" && (
                    <Select
                      placeholder="Xotira O'lchamini Tanlang"
                      mt={3}
                      value={formData.storageSize}
                      onChange={(e) => setFormData({ ...formData, storageSize: e.target.value })}
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
                    value={formData.screenSize}
                    onChange={(e) => setFormData({ ...formData, screenSize: e.target.value })}
                  >
                    {screenSizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}" 
                      </option>
                    ))}
                  </Select>
                  <Input 
                    placeholder="Narxi" 
                    mt={3} 
                    value={formData.price} // Bind price value to input value
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })} // Update price state onChange
                  />
                </>
              )}
            
            </ModalBody>

          <ModalFooter>
            <Button   colorScheme="blue" onClick={handleSave}>Saqlash</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
