import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
  Canvas,
  useFrame,
  useThree,
  useLoader
} from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
  useTexture,
  Environment
} from '@react-three/drei';
import {
  ModelLoader,
  SceneLoader,
  GLTFModel,
  AutoScaledGLTFScene,
  CompositeGLTFScene,
  GLTFSceneWithLoader,
  LoadingScreen
} from './3D/Utilities/GLTFLoaders';

import * as THREE from 'three';

export default function Logo() {
  return (
    <GLTFModel modelPath='/media/3dAssets/LOGO_NIKAI3D/GLFT/LOGO_NIKAI.gltf' scale={0.35} />
  )
}


