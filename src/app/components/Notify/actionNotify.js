export const errorNotify = (msg) => {	
	return {
		type: 'ERROR_NOTIFY',
		notify: {
			isOpen: true,
			msg: msg,
			error:true
		}
	}
}

export const closeNotify = () => {	
	return {
		type: 'CLOSE_NOTIFY',
		notify: {
			isOpen: false,
			msg: '',
			error:null
		}
	}
}

export const copyNotify = (msg) => {	
	return {
		type: 'COPY_NOTIFY',
		notify: {
			isOpen: true,
			msg: msg,
			error:false
		}
	}
}