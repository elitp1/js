class btree {
    constructor(val) {
        this.val = val;
        this.left = null
        this.right = null
    }
}

function add_val_to_tree(root, num) {
    if (root == null) {
        return new btree(num);
    } else {
        if (num <= root.val) {
            root.left = add_val_to_tree(root.left, num);
        } else {
            root.right = add_val_to_tree(root.right, num);
        }
        return root;
    }
}


function print_tree(root) {
    if (root.left != null) {
        print_tree(root.left);
    }
    console.log(root.val);
    if (root.right != null) {
        print_tree(root.right);
    }
}
module.exports = { add_val_to_tree, print_tree };

