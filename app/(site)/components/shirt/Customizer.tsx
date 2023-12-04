import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import config from '@/app/config/config';
import { download } from '@/public/assets/images';
import { downloadCanvasToImage, reader } from '@/app/config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '@/app/config/constants';
import { fadeAnimation, slideAnimation } from '@/app/config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '.';
import { useShirtStore } from '@/app/store/zustandStore';
import Link from 'next/link';
import { DecalFilterType, DecalTabType, DecalType } from '@/app/interfaces/types';
import { EditorTab } from '@/app/interfaces/props/TabProps';

const Customizer = () => {
  let { intro, color, isLogoTexture, isFullTexture, logoDecal, fullDecal, setDynamicState } = useShirtStore();

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // Show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type: string) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type: DecalTabType, result: string) => {
    const decalType = DecalTypes[type] as { stateProperty: string; filterTab: DecalFilterType };

    setDynamicState(decalType.stateProperty, result);
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName: DecalFilterType) => {
    switch (tabName) {
      case 'logoShirt':
        setDynamicState('isLogoTexture', !activeFilterTab[tabName]);
        break;
      case 'stylishShirt':
        setDynamicState('isFullTexture', !activeFilterTab[tabName]);
        break;
      default:
        setDynamicState('isLogoTexture', true);
        setDynamicState('isFullTexture', false);
        break;
    }

    // After setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type: DecalTabType | undefined) => {
    if (!file) {
      return;
    }

    reader(file as unknown as File)
      .then((result) => {
        if (!type) {
          return;
        }

        handleDecals(type, result as unknown as string);
        setActiveEditorTab("");
      })
  }

  return (
    <AnimatePresence>
      {intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab: EditorTab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name as DecalFilterType)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Link href='/'>
              <CustomButton
                type="filled"
                title="Go Back"
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </Link>
          </motion.div>
          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name as DecalFilterType]}
                handleClick={() => handleActiveFilterTab(tab.name as DecalFilterType)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer;
