export interface PuppeteerTestMenuProps {
  dispatchToPuppeteerTestCase: (action: object) => void;
}

export interface PuppeteerTestModalProps extends PuppeteerTestMenuProps {
  isPuppeteerModalOpen: boolean;
  closePuppeteerModal: () => void;
}
