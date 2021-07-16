import { MyposTreeViewDataProvider } from '../abstract/MyposTreeViewDataProvider';
import { ThemeIcon } from 'vscode';
import { MyposTreeItem } from '../abstract/MyposTreeItem';

export class MyposQuickLinksViewProvider extends MyposTreeViewDataProvider {
	buildTree(): Promise<MyposTreeItem[]> {
		const items = [];

		const checkoutItem = new MyposTreeItem('Checkout SDK', {
			iconPath: new ThemeIcon('notebook-unfold'),
		});

		const gettingStartedItem = new MyposTreeItem('Getting Started', {
			commandString: 'openGettingStarted',
			iconPath: new ThemeIcon('link-external'),
		});

		const apiReferenceItem = new MyposTreeItem('API reference', {
			commandString: 'openApiReference',
			iconPath: new ThemeIcon('link-external'),
		});

		const phpSdkDocsItem = new MyposTreeItem('Open PHP SDK Documentation', {
			commandString: 'openPhpSdkDocs',
			iconPath: new ThemeIcon('link-external'),
		});

		const javaSdkDocs = new MyposTreeItem('Open Java SDK Documentation', {
			commandString: 'openJavaSdkDocs',
			iconPath: new ThemeIcon('link-external'),
		});

		const embeddedSdkDocsItem = new MyposTreeItem(
			'Open Embedded SDK Documentation',
			{
				commandString: 'openEmbeddedSdkDocs',
				iconPath: new ThemeIcon('link-external'),
			},
		);

		checkoutItem.addChild(gettingStartedItem);
		checkoutItem.addChild(apiReferenceItem);
		checkoutItem.addChild(phpSdkDocsItem);
		checkoutItem.addChild(javaSdkDocs);
		checkoutItem.addChild(embeddedSdkDocsItem);

		items.push(checkoutItem);

		const PluginsItem = new MyposTreeItem('Plug-ins', {
			iconPath: new ThemeIcon('extensions-view-icon'),
		});

		const WooCommerceItem = new MyposTreeItem('WooCommerce', {
			commandString: 'openWooCommercePlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		const magentoItem = new MyposTreeItem('Magento', {
			commandString: 'openMagentoPlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		const openCartItem = new MyposTreeItem('OpenCart', {
			commandString: 'openOpenCartPlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		const prestaShopItem = new MyposTreeItem('PrestaShop', {
			commandString: 'openPrestaShopPlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		const zenCartItem = new MyposTreeItem('Zen Cart', {
			commandString: 'openZenCartPlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		const xCartItem = new MyposTreeItem('X-Cart', {
			commandString: 'openXCartPlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		const osCommerceItem = new MyposTreeItem('osCommerce', {
			commandString: 'openOsCommerceItemPlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		const cloudCartItem = new MyposTreeItem('Cloud Cart', {
			commandString: 'openCloudCartPlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		const GombashopItem = new MyposTreeItem('Gombashop', {
			commandString: 'openGombashopPlugin',
			iconPath: new ThemeIcon('link-external'),
		});

		PluginsItem.addChild(WooCommerceItem);
		PluginsItem.addChild(magentoItem);
		PluginsItem.addChild(openCartItem);
		PluginsItem.addChild(prestaShopItem);
		PluginsItem.addChild(zenCartItem);
		PluginsItem.addChild(xCartItem);
		PluginsItem.addChild(osCommerceItem);
		PluginsItem.addChild(cloudCartItem);
		PluginsItem.addChild(GombashopItem);

		items.push(PluginsItem);

		const payButtonsAndLinksItem = new MyposTreeItem(
			'Open Pay Buttons & Pay Links Documentation',
			{
				commandString: 'openPayButtonsAndLinks',
				iconPath: new ThemeIcon('notebook-render-output'),
			},
		);

		items.push(payButtonsAndLinksItem);

		const storeManagementItem = new MyposTreeItem(
			'Open Store Management Documentation',
			{
				commandString: 'openStoreManagementDocs',
				iconPath: new ThemeIcon('link-external'),
			},
		);

		items.push(storeManagementItem);

		const clockItem = new MyposTreeItem('Open Clock Documentation', {
			commandString: 'openClockDocs',
			iconPath: new ThemeIcon('link-external'),
		});

		items.push(clockItem);

		const samplesItem = new MyposTreeItem('Open Samples', {
			commandString: 'openSamples',
			iconPath: new ThemeIcon('link-external'),
		});

		items.push(samplesItem);

		return Promise.resolve(items);
	}
}
