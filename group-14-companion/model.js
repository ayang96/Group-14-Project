import * as common from 'common';

/***********

Documentation

Sections
	Data
	sampleData

***********/

export class Data {


	/**
	 *
	 * STATIC PROPERTIES / METHODS
	 * 
	 */
	
	/**
	 * Standard strings for showing the state of a document.
	 * Use it as just a class constant, i.e. Data.IN
	 * (I wrote it as a getter method because JavaScript doesn't support static properties)
	 */
	static get IN() { return 'in' }
	static get YOU() { return 'you' }
	static get OTHER() { return 'other' }

	/**
	 * Standard strings for actions that happen to a document.
	 */
	static get CREATE() { return 'created' }
	static get RETRIEVE() { return 'retrieved' }
	static get RETURN() { return 'returned' }
	static get DELETE() { return 'deleted' }

	/**
	 * Generates a guaranteed unique "hash" ID as a string.
	 */
	static newID() {
		return 'ID' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
	}


	/**
	 *
	 * CONSTRUCTOR
	 * 
	 */
	
	/**
	 * Initializes Data object with most tables empty and some tables with
	 * default entries. State is uninitialized.
	 */
	constructor() {

		/* Holds the current state of the application for screen logic */
		this.state = {
			document: '', // The id of the current document the user is viewing
			folder: '', // The id of the current folder the user is viewing
			user: '', // The id of the current user the user is viewing
			login: '', // The id of the user
		};

		/* Our data "tables" */
		this.documents = {
			'dummyDoc': { // Temp. Remove when done
				name: 'dummy doc',	
				labels: [],				
				tier: 'admin',
				description: '',	
				folder: 'root',			
				locker: null,			
				history: ['e1'],		
			}
		};
		this.folders = {
			'root': { // The root or highest folder in the folder hierarchy
				name: 'root', // temp. Change back to '' when done
				labels: [],
				parent: null,
				folders: ['dummy'], //temp. Change back to empty when done
				documents: ['dummyDoc'], //temp. Change back to empty when done
			},
			'dummy': { // Temp. remove when done
				name: 'dummy',
				labels: ['temp'],
				parent: 'root',
				folders: [],
				documents: [],
			},
		};
		this.users = {
			'admin': { // Initial admin account. Can be different from the actual administrator account
				firstName: 'Admin',
				lastName: '',
				tier: 'admin',
				email: '',
			},
			'unknown': { // Default value for broken links to users
				firstName: 'Unknown',
				lastName: '',
				tier: 'default',
				email: '',
			}
		};
		this.tiers = {
			'admin': { // Admin tier. Should have access to everything
				name: 'Admin',
				color: 'black',
			},
			'default': { // Lowest tier
				name: 'Default',
				color: 'grey',
			},
		};
		this.labels = {
			'temp': { // Temp. Remove when done.
				name: 'temp',
				color: 'red',
				abbreviation: 'T',
			}
		};
		this.events = {
			'e1': {user: 'admin',	// Temp. Remove when done.
				document: 'dummyDoc',			
				action: 'created',			
				date: new Date(),
			}
		};
		this.lockers = {};
		this.cabinets = {};
		this.emptyLockers = new Set();
	}


	/**
	 *
	 * GENERAL METHODS
	 * 
	 */
	
	/**
	 * Set the state of the application
	 * 
	 * @param {Object} data: new values
	 *
	 * Usage: data.setState({ folder: '3e6f5707' });
	 */
	setState(data) {
		Object.assign(this.state, data);
	}

	/**
	 * Returns all of the data in JSON format
	 */
	toString() {
		return JSON.stringify({
			state: this.state,
			documents: this.documents,
			folders: this.folders,
			users: this.users,
			tiers: this.tiers,
			labels: this.labels,
			events: this.events,
			lockers: this.lockers,
			cabinets: this.cabinets,
		});
	}

	/**
	 * Tests if all references in the object to other entries in other
	 * tables are valid and point to actual entries. Allows null values
	 * for compatibility with other methods.
	 * 
	 * @param  {Object} data: keys with standard names, values to test
	 * @return {boolean} true if all references are valid
	 *
	 * Usage: data.validateData({ folder: '3e6f5707', labels: ['8294fdef', '0e063425'] });
	 */
	validateData(data) {
		if ('documents' in data) {
			if (! data.labels.every(id => (id in this.documents))) return false;
		}
		if ('folder' in data) {
			if (! (data.folder in this.folders || data.folder === null)) return false; 
		}
		if ('folders' in data) {
			if (! data.folders.every(id => (id in this.folders))) return false;
		}
		if ('parent' in data) {
			if (! (data.parent in this.folders || data.parent === null)) return false;
		}
		if ('user' in data) {
			if (! (data.user in this.users || data.user === null)) return false;
		}
		if ('tier' in data) {
			if (! (data.tier in this.tiers || data.tier === null)) return false;
		}
		if ('labels' in data) {
			if (! data.labels.every(id => (id in this.labels))) return false;
		}
		if ('history' in data) {
			if (! data.history.every(id => (id in this.events))) return false;
		}
		if ('locker' in data) {
			if (! (data.locker in this.lockers || data.locker === null)) return false;
		}
		if ('cabinet' in data) {
			if (! (data.cabinet in this.lockers || data.cabinet === null)) return false;
		}
		return true;
	}

	/**
	 * Corrects any values with broken points to other tables.
	 * Replaces them with default values, or for lists, removes the item from the list.
	 * 
	 * @param  {Object} data: keys with standard names, values to correct
	 */
	correctData(data) {
		if ('documents' in data) {
			data.documents = data.documents.filter(id => (id in this.documents));
		}
		if ('folder' in data) {
			data.folder = data.folder in this.folders ? data.folder : 'root';
		}
		if ('folders' in data) {
			data.folders = data.folders.filter(id => (id in this.folders));
		}
		if ('parent' in data) {
			data.parent = (data.parent in this.folders || data.parent === null) ? data.parent : 'root';
		}
		if ('user' in data) {
			data.user = (data.user in this.users || data.user === null) ? data.user : 'unknown';
		}
		if ('tier' in data) {
			data.tier = data.tier in this.tiers ? data.tier : 'default';
		}
		if ('labels' in data) {
			data.labels = data.labels.filter(id => (id in this.labels));
		}
		if ('history' in data) {
			data.history = data.history.filter(id => (id in this.events));
		}
		if ('locker' in data) {
			data.locker = (data.locker in this.lockers || data.locker === null) ? data.locker : null;
		}
		if ('cabinet' in data) {
			// TODO
		}
	}

	/**
	 * Add an entry to a table. Entry data must be valid. Generates entry id.
	 * 
	 * @param {Object} table: Data table to add entry to
	 * @param {Object} data: entry to add
	 * @return {String} id of added entry, or false if unsuccessful
	 */
	addEntry(table, data) {
		if (this.validateData(data)) {
			let id = Data.newID();
			table[id] = data;
			return id;
		} else {
			return null;
		}
	}

	/**
	 * Update an entry in a table. Entry id and data must be valid.
	 * 
	 * @param  {Object} table: ex. this.documents, this.labels
	 * @param  {String} id: id of entry in table
	 * @param  {Object} data: new values
	 * @return {boolean} true if successfully updated (new values are valid)
	 */
	updateEntry(table, id, data) {
		if (id in table && this.validateData(data)) {
			let entry = table[id];
			Object.assign(entry, data);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Gets a copy of an entry from a table. If the entry contains
	 * invalid links, these will be corrected in the original table
	 * before making the copy.
	 * 
	 * @param  {Object} table: ex. this.documents, this.labels
	 * @param  {String} id: id of entry in table
	 * @return {Object} copy of entry in table
	 */
	getCorrectedCopy(table, id) {
		if (id in table) {
			let entry = table[id];
			if (! this.validateData(entry)) {
				this.correctData(entry);
			}
			let copy = Object.assign({}, entry);
			return copy;
		} else {
			return null;
		}
	}


	/**
	 * 
	 * DOCUMENTS
	 * 
	 */

	/**
	 * Creates a new document. Also initializes its history with a 'create' event if history not passed in.
	 * @param {Object} data: document data, links must be valid, see code
	 * @return {String} id of document if successfully created, else null
	 */
	addDocument(data) {
		let document = { // default values
			name: 'New Document',	// {String}
			labels: [],				// {String[]} ids of labels
			tier: this.users[this.state.login].tier,	// {String} id of tier
			description: '',		// {String}
			folder: 'root',			// {String} id of containing folder
			locker: null,			// {String} id of locker. Should be null when document out.
			history: [],			// {String[]} ids of events. Sorted by date ascending.
		}
		Object.assign(document, data);
		let id = this.addEntry(this.documents, document);
		if (id === null) return null;

		if (! ('history' in data)) {
			let eventID = this.addEvent({ user: this.state.login, document: id, action: Data.CREATE });
			this.updateDocument(id, { history: [eventID] });
		}
		return id;
	}

	/**
	 * Updates a document's data.
	 * 
	 * @param  {String} id: document id
	 * @param  {Object} data: new values. All links must be valid
	 * @return {boolean} true if successful update
	 */
	updateDocument(id, data) {
		return this.updateEntry(this.documents, id, data);
	}

	/**
	 * Returns a copy of a document's data. Corrects any broken links
	 * in the original data before copying. De-references links.
	 * 
	 * @param  {String} id: document id
	 * @return {Object} copy of document data. Operations on this copy
	 * 					will not affect the original data. Links to
	 * 					labels, tiers, history will be de-referenced into
	 * 					actual data. Additional useful values added: out,
	 * 					dateCreated.
	 * 
	 * Example returned data:
	 * 	{
	 * 		id: '3b2aa2c6',
	 * 		name: 'Document #1',
	 * 		labels: [
	 * 			{
	 * 				id: '3e6f5707',
	 * 				name: 'completed',
	 * 				color: 'green',
	 * 				abbreviation: 'C',
	 * 			},
	 * 			{
	 * 				id: '46efacaf',
	 * 				name: 'in progress',
	 * 				color: 'yellow',
	 * 				abbreviation: 'I',
	 * 			}
	 * 		],
	 * 		tier: {
	 * 			id: '936420de',
	 * 			name: 'Tier 1',
	 * 			color: 'red',
	 * 		},
	 * 		out: 'you',
	 * 		dateCreated: new Date('1995-12-17T03:24:00'),
	 * 		description: 'Testing 123',
	 * 		folder: '8294fdef',
	 * 		locker: '0e063425',
	 * 		history: [
	 * 			{
	 * 				id: '3b2aa2c6',
	 * 				user: {
	 * 					id: 'ae97a999',
	 * 					firstName: 'allison',
	 * 					lastName: 'rory',
	 * 					tier: {
	 * 						id: '936420de',
	 * 						name: 'Tier 1',
	 * 						color: 'red',
	 * 					},
	 * 					email: 'arory@gmail.com',
	 * 					abbreviation: 'AR',
	 * 					fullName: 'Allison Rory',
	 * 				},
	 * 				document: ... (see getDocumentAbbreviatedData),
	 * 				action: 'created',
	 * 				date: new Date('1995-12-17T03:24:00'),
	 * 			},
	 * 			{
	 * 				... (another one)
	 * 			},
	 * 		]
	 * 	}
	 * 
	 */
	getDocumentData(id) {
		let document = this.getCorrectedCopy(this.documents, id);
		if (document === null) return null;

		document.id = id;
		document.labels = this.getLabelListData(document.labels);
		document.tier = this.getTierData(document.tier);
		document.out = this.getDocumentState(id);
		document.history = this.getEventListData(document.history);
		document.dateCreated = document.history[0].date;
		document.path = this.getPath(document.folder);

		return document;
	}

	/**
	 * Returns an abbreviated copy of a document's data. See
	 * getDocumentData for full caveats.
	 * 
	 * @param  {String} id: document id
	 * @return {Object} abbreviated copy of document data
	 *
	 * Example returned data:
	 * 	{
	 * 		id: '3b2aa2c6',
	 * 		name: 'Document #1',
	 * 		labels: ['3e6f5707', '46efacaf'],
	 * 		tier: '936420de',
	 * 		description: 'Testing 123',
	 * 		folder: '8294fdef',
	 * 		locker: '0e063425',
	 * 		history: ['3b2aa2c6', '3e6f5707'],
	 * 	}
	 */
	getDocumentAbbreviatedData(id) {
		let document = this.getCorrectedCopy(this.documents, id);
		if (document === null) return null;

		document.id = id;

		return document;
	}

	/**
	 * Derefences a list of document ids to full document data
	 * 
	 * @param  {String[]} idList: array of ids of documents
	 * @return {Object[]} array of document data (see getDocumentData)
	 */
	getDocumentListData(idList) {
		return idList.map(id => this.getDocumentData(id)).filter(x => x);
	}

	/**
	 * Dereferences a list of document ids to abbreviated document data
	 * 
	 * @param  {String[]} idList: array of ids of documents
	 * @return {[type]} array of document data (see getDocumentAbbreviatedData)
	 */
	getDocumentListAbbreviatedData(idList) {
		return idList.map(id => this.getDocumentAbbreviatedData(id)).filter(x => x);
	}

	/**
	 * Gets the current state of the document based on its history.
	 * 
	 * @param  {String} id: document id
	 * @return {String} state of the document, one of: 'in', 'you', 'other' (see Data static constants)
	 */
	getDocumentState(id) {
		if (id in this.documents) {
			let document = this.documents[id];
			let lastEvent = this.events[document.history[document.history.length - 1]];
			if (lastEvent.action === Data.RETURN) {
				return Data.IN;
			} else {
				if (lastEvent.user === this.state.login) {
					return Data.YOU;
				} else {
					return Data.OTHER;
				}
			}
		} else {
			return null;
		}
	}

	retrieveDocument(id) {
		let document = this.getDocumentData(id);
		if (document === null) return false;
		if (document.out != Data.IN) return false;
		let eventID = this.addEvent({ document: id, action: Data.RETRIEVE });
		document.history.push(eventID);
		this.updateDocument(id, {
			history: document.history,
			locker: null
		});
		this.freeLocker(document.locker);
		return true;
	}

	returnDocument(id) {
		let document = this.getDocumentData(id);
		if (document === null) return false;
		if (document.out === Data.IN) return false;
		let lockerID = this.getEmptyLocker();
		if (! lockerID) return false;
		let eventID = this.addEvent({ document: id, action: Data.RETURN });
		document.history.push(eventID);
		this.updateDocument(id, {
			history: document.history,
			locker: lockerID,
		});
		this.useLocker(lockerID);
		return true;
	}

	/**
	 * 
	 * FOLDERS
	 * 
	 */
	
	/**
	 * Creates a new folder.
	 * 
	 * @param {Object} data: folder data, links must be valid, see code
	 * @return {String} id of folder if successfully created, else null
	 */
	addFolder(data) {
		let folder = { // default values
			name: 'New Folder',	// {String}
			labels: [],			// {String[]} ids of labels
			parent: 'root',		// {String} id of parent folder
			folders: [],		// {String[]} ids of child folders
			documents: [],		// {String[]} ids of child documents
		}
		Object.assign(folder, data);
		return this.addEntry(this.folders, folder);
	}

	/**
	 * Updates a folder's data.
	 * 
	 * @param  {String} id: folder id
	 * @param  {Object} data: new values. All links must be valid
	 * @return {boolean} true if successful update
	 */
	updateFolder(id, data) {
		return this.updateEntry(this.folders, id, data);
	}

	getFolderData(id) {
		let folder = this.getCorrectedCopy(this.folders, id);
		if (folder === null) return null;

		folder.id = id;
		folder.labels = this.getLabelListData(folder.labels);
		folder.tiers = this.getFolderTiers(id);
		folder.folders = this.getFolderListAbbreviatedData(folder.folders);
		folder.documents = this.getDocumentListAbbreviatedData(folder.documents);
		folder.path = this.getPath(id);

		return folder;
	}

	getFolderAbbreviatedData(id) {
		let folder = this.getCorrectedCopy(this.folders, id);
		if (folder === null) return null;

		folder.id = id;
		folder.labels = this.getLabelListData(folder.labels);
		folder.tiers = this.getFolderTiers(id);

		return folder;
	}

	getFolderListAbbreviatedData(idList) {
		return idList.map(id => this.getFolderAbbreviatedData(id)).filter(x => x);
	}

	/**
	 * Returns the tiers of this folder, which is the union of all
	 * the tiers of all documents and folders inside this folder.
	 * 
	 * @param  {String} id: folder id
	 * @return {Object[]} list of tier data, or null if broken links
	 */
	getFolderTiers(id) {
		if (id in this.folders) {
			let tiers = new Set();
			this._findFolderTiers(this.folders[id], tiers);
			tiers = Array.from(tiers);
			return this.getTierListData(tiers);
		} else {
			return null;
		}
	}

	/**
	 * Helper for getFolderTiers. Performs a DFS preorder traversal
	 * of the folder heirarchy in this folder, adding any found tiers
	 * to tiers.
	 * @param  {Object} folder: entry of folder in table
	 * @param  {Set} tiers: ids of tiers already found
	 */
	_findFolderTiers(folder, tiers) {
		for (let id of folder.documents) {
			let document = this.documents[id];
			if (document) {
				tiers.add(document.tier);
			}
		}
		for (let id of folder.folders) {
			let child = this.folders[id];
			if (child) {
				//this._getFolderTiers(child, tiers);
				this.getFolderTiers(child, tiers); //Other didn't compile
			}
		}
	}

	/**
	 * Finds path of a folder
	 * 
	 * @param  {String} id: folder id
	 * @return {Object} two properties:
	 * 						folderDataList: list of folder abbreviated data
	 * 										First element is always root
	 * 										Last element is always folder passed in
	 * 						string: file path string, e.g. '\Folder 1\Folder 2\'
	 * 					or null if broken links
	 */
	getPath(id) {
		let current = id;
		let folderDataList = [];
		while (current != null) {
			if (current in this.folders) {
				let folder = this.getFolderAbbreviatedData(current);
				folderDataList.unshift(folder);
				current = folder.parent;
			} else {
				return null;
			}
		}
		let pathString = folderDataList.map(folder => folder.name).join('\\') + '\\';
		return {
			folderDataList: folderDataList,
			string: pathString,
		}
	}


	/**
	 * 
	 * USERS
	 * 
	 */

	/**
	 * Creates a new user.
	 * 
	 * @param {Object} data: user data, links must be valid, see code
	 * @return {String} id of user if successfully created, else null
	 */
	addUser(data) {
		let user = { // default values
			firstName: '',		// {String}
			lastName: '',		// {String}
			tier: 'default',	// {String} id of tier
			email: '',			// {String}
		}
		Object.assign(user, data);
		return this.addEntry(this.users, user);
	}

	/**
	 * Updates a user's data.
	 * 
	 * @param  {String} id: user id
	 * @param  {Object} data: new values. All links must be valid
	 * @return {boolean} true if successful update
	 */
	updateUser(id, data) {
		return this.updateEntry(this.users, id, data);
	}

	getUserData(id) {
		let user = this.getCorrectedCopy(this.users, id);
		if (user === null) return null;

		user.id = id;
		user.tier = this.getTierData(user.tier);
		user.abbreviation = user.firstName.slice(0, 1).toUpperCase() + user.lastName.slice(0, 1).toUpperCase();
		user.fullName = common.fullName(user.firstName, user.lastName);

		return user;
	}


	/**
	 * 
	 * TIERS
	 * 
	 */

	/**
	 * Creates a new tier.
	 * 
	 * @param {Object} data: tier data, links must be valid, see code
	 * @return {String} id of tier if successfully created, else null
	 */
	addTier(data) {
		let tier = { // default values
			name: 'Tier ' + Object.keys(this.tiers).length + 1,	// {String}
			color: common.randomColor(),					// {String} name of color from common.js
		}
		Object.assign(tier, data);
		return this.addEntry(this.tiers, tier);
	}

	/**
	 * Updates a tier's data.
	 * 
	 * @param  {String} id: tier id
	 * @param  {Object} data: new values. All links must be valid
	 * @return {boolean} true if successful update
	 */
	updateTier(id, data) {
		return this.updateEntry(this.tiers, id, data);
	}

	getTierData(id) {
		let tier = this.getCorrectedCopy(this.tiers, id);
		if (tier === null) return null;

		tier.id = id;

		return tier;
	}

	getTierListData(idList) {
		return idList.map(id => this.getTierData(id)).filter(x => x);
	}


	/**
	 * 
	 * LABELS
	 * 
	 */

	/**
	 * Creates a new label.
	 * 
	 * @param {Object} data: label data, links must be valid, see code
	 * @return {String} id of label if successfully created, else null
	 */
	addLabel(data) {
		let label = { // default values
			name: 'Label ' + Object.keys(this.labels).length + 1,	// {String}
			color: common.randomColor(),					// {String} name of color from common.js
		}
		Object.assign(label, data);
		return this.addEntry(this.labels, label);
	}

	/**
	 * Updates a label's data.
	 * 
	 * @param  {String} id: label id
	 * @param  {Object} data: new values. All links must be valid
	 * @return {boolean} true if successful update
	 */
	updateLabel(id, data) {
		return this.updateEntry(this.labels, id, data);
	}

	getLabelData(id) {
		let label = this.getCorrectedCopy(this.labels, id);
		if (label === null) return null;

		label.id = id;
		label.abbreviation = label.name.slice(0, 1).toUpperCase();

		return label;
	}

	getLabelListData(idList) {
		return idList.map(id => this.getLabelData(id)).filter(x => x);
	}


	/**
	 * 
	 * EVENTS
	 * 
	 */

	/**
	 * Creates a new event.
	 * 
	 * @param {Object} data: event data, links must be valid, see code
	 * @return {String} id of event if successfully created, else null
	 */
	addEvent(data) {
		let event = { // default values
			user: this.state.login,	// {String} id of user
			document: null,			// {String} id of document, or null if doesn't concern any document
			action: null,			// {String} one of 'created', 'retrieved', etc. See Data static constants
			date: new Date(),		// {Date} date of event
		}
		Object.assign(event, data);
		return this.addEntry(this.events, event);
	}

	getEventData(id) {
		let event = this.getCorrectedCopy(this.events, id);
		if (event === null) return null;

		event.id = id;
		event.user = this.getUserData(event.user);
		event.document = event.document ? this.getDocumentAbbreviatedData(event.document) : null;

		return event;
	}

	getEventListData(idList) {
		return idList.map(id => this.getEventData(id)).filter(x => x);
	}


	/**
	 * 
	 * LOCKERS
	 * 
	 */

	addLocker(data) {
		let id = this.addEntry(this.lockers, data);
		if (id === null) return null;
		this.freeLocker(id);
	}

	getLockerData(id) {
		let locker = this.getCorrectedCopy(this.lockers, id);
		if (locker === null) return null;

		locker.id = id;
		locker.cabinet = this.getCabinetData(id);

		return locker;
	}

	freeLocker(id) {
		if (id in this.lockers) {
			this.emptyLockers.add(id);
		}
	}

	useLocker(id) {
		if (id in this.lockers) {
			this.emptyLockers.delete(id);
		}
	}

	getEmptyLocker() {
		let lockerList = Array.from(this.emptyLockers);
		if (lockerList.length > 0) {
			return lockerList[Math.floor(Math.random() * lockerList.length)];
		} else {
			return null;
		}
	}


	/**
	 * 
	 * CABINETS
	 * 
	 */
	
	addCabinet(data) {
		return this.addEntry(this.cabinets, data);
	}

	getCabinetData(id) {
		let cabinet = this.getCorrectedCopy(this.cabinets, id);
		if (cabinet === null) return null;

		cabinet.id = id;

		return cabinet;
	}
}


/*********

SAMPLE DATA

*********/

export var sampleData = new Data();

let cabinet1 = sampleData.addCabinet({
	name: 'Cabinet 01',
	url: 'http://127.0.0.1',
	capacity: '30',
});

for (let i = 0; i < 30; i++) {
	sampleData.addLocker({
		cabinet: cabinet1,
		index: i,
	});
}

let tier1 = sampleData.addTier({ name: 'Tier 1'});
let tier2 = sampleData.addTier({ name: 'Tier 2'});

let user1 = sampleData.addUser({
	firstName: 'allison',
	lastName: 'rory',
	tier: 'admin',
	email: 'arory@gmail.com',
});

sampleData.setState({
	login: user1
});

let user2 = sampleData.addUser({
	firstName: 'brian',
	lastName: 'chen',
	tier: tier1,
	email: 'bchen@gmail.com',
});
let user3 = sampleData.addUser({
	firstName: 'dominique',
	lastName: 'yano',
	tier: tier2,
	email: 'dyano@gmail.com',
});

let label1 = sampleData.addLabel({ name: 'Started' });
let label2 = sampleData.addLabel({ name: 'Completed' });

let folder1 = sampleData.addFolder({
	name: 'Folder 1',
	labels: [label1],
	parent: 'root',
});

let document1 = sampleData.addDocument({
	name: 'Document 1',
	labels: [label1, label2],
	tier: tier1,
	description: 'Document 1 description',
	folder: 'root',
});
sampleData.returnDocument(document1);
sampleData.documents[document1].history.push(sampleData.addEvent({ user: user2, document: document1, action: Data.RETRIEVE }));
sampleData.documents[document1].history.push(sampleData.addEvent({ user: user2, document: document1, action: Data.RETURN }));
sampleData.documents[document1].history.push(sampleData.addEvent({ user: user3, document: document1, action: Data.RETRIEVE }));
sampleData.documents[document1].history.push(sampleData.addEvent({ user: user3, document: document1, action: Data.RETURN }));

let document2 = sampleData.addDocument({
	name: 'Document 2',
	labels: [label2],
	tier: tier2,
	description: 'Document 2 description',
	folder: 'root',
});
sampleData.returnDocument(document2);
sampleData.documents[document2].history.push(sampleData.addEvent({ user: user2, document: document2, action: Data.RETRIEVE }));
sampleData.documents[document2].history.push(sampleData.addEvent({ user: user2, document: document2, action: Data.RETURN }));
sampleData.documents[document2].history.push(sampleData.addEvent({ user: user3, document: document2, action: Data.RETRIEVE }));

let document3 = sampleData.addDocument({
	name: 'Document 3',
	labels: [],
	tier: 'admin',
	description: 'Document 3 description',
	folder: folder1,
});
sampleData.returnDocument(document3);
sampleData.documents[document3].history.push(sampleData.addEvent({ user: user2, document: document3, action: Data.RETRIEVE }));
sampleData.documents[document3].history.push(sampleData.addEvent({ user: user2, document: document3, action: Data.RETURN }));
sampleData.documents[document3].history.push(sampleData.addEvent({ user: user3, document: document3, action: Data.RETRIEVE }));
sampleData.documents[document3].history.push(sampleData.addEvent({ user: user3, document: document3, action: Data.RETURN }));

let document4 = sampleData.addDocument({
	name: 'Document 4',
	labels: [label1],
	tier: tier1,
	description: 'Document 4 description',
	folder: folder1,
});
sampleData.returnDocument(document4);
sampleData.documents[document4].history.push(sampleData.addEvent({ user: user2, document: document4, action: Data.RETRIEVE }));
sampleData.documents[document4].history.push(sampleData.addEvent({ user: user2, document: document4, action: Data.RETURN }));
sampleData.documents[document4].history.push(sampleData.addEvent({ user: user1, document: document4, action: Data.RETRIEVE }));

let document5 = sampleData.addDocument({
	name: 'Document 5',
	labels: [label1, label2],
	tier: tier2,
	description: 'Document 5 description',
	folder: folder1,
});
sampleData.returnDocument(document5);
sampleData.documents[document5].history.push(sampleData.addEvent({ user: user2, document: document5, action: Data.RETRIEVE }));
sampleData.documents[document5].history.push(sampleData.addEvent({ user: user2, document: document5, action: Data.RETURN }));
sampleData.documents[document5].history.push(sampleData.addEvent({ user: user3, document: document5, action: Data.RETRIEVE }));

sampleData.setState({ document: document1 });