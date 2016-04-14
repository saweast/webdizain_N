<!DOCTYPE html>
    <html>
    <head>
    <script>
    function color(id) {
        var elems = document.getElementsByTagName('tr'),
            length = elems.length;
        for (i = 0; i < length; i++)
            if (elems[i].id == id)
                elems.style.backgroundColor = 'red';
    } </script>

< /head> < body > < table border = "1"
width = "30%" >
    < tr id = "c1" >
    < td > text 1 < /td> < td > text 2 < /td >

    < /body> < /html >