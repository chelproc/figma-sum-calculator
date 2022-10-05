figma.showUI(__html__, { width: 200, height: 40, themeColors: true });

function onSelectionChange() {
  let sum = 0;

  function processString(string: string) {
    const parsedFloat = parseFloat(string);
    if (!Number.isNaN(parsedFloat)) {
      sum += parsedFloat;
    }
  }

  function processSceneNode(sceneNode: SceneNode) {
    if ("characters" in sceneNode) {
      processString(sceneNode.characters);
    }

    if ("text" in sceneNode) {
      processString(sceneNode.text.characters);
    }

    if ("children" in sceneNode) {
      for (const node of sceneNode.children) {
        processSceneNode(node);
      }
    }
  }

  for (const selectedNode of figma.currentPage.selection) {
    processSceneNode(selectedNode);
  }

  figma.ui.postMessage(sum);
}

figma.on("selectionchange", onSelectionChange);
onSelectionChange();
