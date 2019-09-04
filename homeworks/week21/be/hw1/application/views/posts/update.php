<h2><?php echo $title ?></h2>

<?php echo validation_errors(); ?>

<div class="container">
    <div class="row justify-content-md-center">
        <div class="col-md-5">
            <?php echo form_open('posts/update') ?>
                <div class="form-group">
                    <label for="content">Content: </label>
                    <textarea type="text" name="content" class="form-control" id="content" placeholder="content" ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
    </div>
</div>