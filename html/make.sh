# on all lines containing  an include tag, grab the value of the src attribute,
# give this path to cat and the **e**valuate GNU sed command will feed the output
sed '/include/ s/.*<include src="\([^"]\+\)">$/cat \1/ e' index.html > ../index.html
