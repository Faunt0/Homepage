cl = console.log
sessionStorage.setItem('name', 'Lex');

function sendInput() {
	sessionStorage.setItem('message', document.getElementById('userinput').value);
	console.log('yeah got it')
}

function retrieve() {
	console.log(sessionStorage.getItem('message'))
}

// console.log(typeof(arraytest))
// var arraytest = 'hlloworld'

// var grg = ['1', '2']
// grg.push('3')
// console.log(grg)

var todos = [
	{id: 0, text: 'lex'},
	{id: 1, text: 'moreless'},
]

newitem = { id: 2, text: 'guess so' }
todos.push(newitem)


// cl(todos)
// making the sessionstorage string
var valuestr = '';
for (let i = 0; i < todos.length; i++) {
	valuestr += todos[i].text + ';';
}
// cl(textvalues)

// sending/actions etc
sessionStorage.setItem('todos', valuestr)
// end of that

// newitem = { id: 2, text: 'guess so' }
todos.splice(2, 1)



// var valuestr = '';
// for (let i = 0; i < todos.length; i++) {
// 	valuestr += todos[i].text + ';';
// }

// sessionStorage.setItem('todos', valuestr)



// decoding and building arraytest back up
// cl(storageString.length)
// cl(storageString[i])
var storedTodos = []
storageString = sessionStorage.getItem('todos').split(';')
// cl(storageString)
for (let i = 0; i < storageString.length-1; i++) {
	if (storageString[i] != "") {
		storedTodos.push({id: i, text: storageString[i]})
	}
}


cl(todos)
cl(storedTodos)


// cl(toString(arraytest))


// sessionStorage.setItem('arrayt', toString(arraytest));

// console.log(arraytest);
// newitem = {text: 'food huh'};
// arraytest.push(newitem)
// console.log(arraytest)

// cl(sessionStorage.arrayt)


// arraytest = localStorage.getItem('arrayt');