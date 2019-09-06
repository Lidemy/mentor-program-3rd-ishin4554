<h2><?php echo $title ?></h2>

<?php echo validation_errors(); ?>

<div class="container">
    <div class="row justify-content-md-center">
        <div class="col-md-5">
            <?php echo form_open('users/create') ?>
                <div class="form-group">
                    <label for="nickname">Nickname: </label>
                    <input type="text" name="nickname" class="form-control" id="nickname" placeholder="nickname">
                </div>
                <div class="form-group">
                    <label for="account">Username: </label>
                    <input type="text" name="account" class="form-control" id="account" placeholder="username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" id="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
    </div>
</div>